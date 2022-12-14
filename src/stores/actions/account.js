import {mergeByProperty, logger} from '../../helpers';
import {pb} from '../../services';
import {SET_ACCOUNT, SET_TRANSACTION, SET_SYNC, SET_FEATURES} from '../types';
import {begin, end} from './global';
import NetInfo from '@react-native-community/netinfo';

export const formatData = () => (dispatch, getState) => {
  const {accounts, transactions} = getState().account;
  const newTransactions = transactions.map(transaction => {
    delete transaction.updateAt;
    delete transaction.archiveAt;
    return transaction;
  });
  const newAccounts = accounts.map(account => {
    delete account.updateAt;
    delete account.archiveAt;
    return account;
  });
  dispatch({type: SET_ACCOUNT, payload: newAccounts});
  dispatch({
    type: SET_TRANSACTION,
    payload: newTransactions,
  });
};

export const addAccount = data => (dispatch, getState) => {
  const {accounts} = getState().account;
  dispatch({type: SET_ACCOUNT, payload: [...accounts, data]});
};

export const updateAccount = (id, data) => (dispatch, getState) => {
  const {accounts} = getState().account;
  const newAccount = accounts.map(account =>
    account.id === id ? data : account,
  );
  dispatch({type: SET_ACCOUNT, payload: newAccount});
};

export const addTransaction = data => (dispatch, getState) => {
  const {transactions} = getState().account;
  const newTransactions = [
    {...data, id: transactions.length + 1},
    ...transactions,
  ].sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
  dispatch({
    type: SET_TRANSACTION,
    payload: newTransactions,
  });
};

export const updateTransaction = (id, data) => (dispatch, getState) => {
  const {transactions} = getState().account;
  const newTransaction = transactions.map(transaction =>
    transaction.id === id ? data : transaction,
  );
  dispatch({type: SET_TRANSACTION, payload: newTransaction});
};

export const deleteTransaction = id => (dispatch, getState) => {
  const deletedAt = Date.now();
  const {transactions} = getState().account;
  const newTransaction = transactions.map(transaction =>
    transaction.id === id
      ? {...transaction, deletedAt, updatedAt: deletedAt}
      : transaction,
  );
  dispatch({type: SET_TRANSACTION, payload: newTransaction});
};

export const syncData =
  (syncCode = '', loading = true) =>
  async (dispatch, getState) => {
    logger('SyncData...');
    let netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      try {
        const {sync} = getState().account;
        let code = syncCode || sync.code;
        if (code) {
          loading && dispatch(begin());
          let getSync = await pb.getList('cake_sync', {
            filter: `(code='${code}')`,
          });
          const {accounts, transactions} = getState().account;
          if (getSync.items.length > 0) {
            const syncDataResult = getSync.items[0];
            const mergedAccounts = mergeByProperty(
              accounts.concat(syncDataResult.accounts),
              'id',
            );
            const mergedTransactions = mergeByProperty(
              transactions.concat(syncDataResult.transactions),
              'id',
            );
            await pb.update('cake_sync', syncDataResult.id, {
              accounts: mergedAccounts,
              transactions: mergedTransactions,
            });
            dispatch({
              type: SET_ACCOUNT,
              payload: mergedAccounts.sort((a, b) => a.id - b.id),
            });
            dispatch({
              type: SET_TRANSACTION,
              payload: mergedTransactions.sort((a, b) => {
                if (a.id < b.id) {
                  return 1;
                }
                if (a.id > b.id) {
                  return -1;
                }
                return 0;
              }),
            });
            dispatch({type: SET_FEATURES, payload: syncDataResult.features});
            delete syncDataResult.accounts;
            delete syncDataResult.transactions;
            delete syncDataResult.features;
            dispatch({type: SET_SYNC, payload: syncDataResult});
            dispatch(end());
          } else {
            let resultSync = await pb.create('cake_sync', {
              name: syncCode,
              code: syncCode,
              accounts,
              transactions,
            });
            if (resultSync.code === 400) {
              dispatch({type: SET_SYNC, payload: false});
            } else {
              dispatch({type: SET_FEATURES, payload: []});
              delete resultSync.accounts;
              delete resultSync.transactions;
              delete resultSync.features;
              dispatch({type: SET_SYNC, payload: resultSync});
            }
            dispatch(end());
          }
        }
        dispatch(end());
      } catch (error) {
        dispatch(end());
        logger(error);
      } finally {
        dispatch(end());
      }
    }
  };
