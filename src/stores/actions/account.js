import {removeObjectWithId} from '../../helpers';
import {pb} from '../../services';
import {SET_ACCOUNT, SET_TRANSACTION, SET_SYNC} from '../types';
import {begin, end} from './global';

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

export const deleteAccount = id => (dispatch, getState) => {
  const {accounts, transactions} = getState().account;
  const newAccount = removeObjectWithId(accounts, id);
  const newTransactions = transactions.filter(
    transaction => transaction.idAccount !== id,
  );
  dispatch({type: SET_ACCOUNT, payload: newAccount});
  dispatch({type: SET_TRANSACTION, payload: newTransactions});
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
  const {transactions} = getState().account;
  const newTransactions = removeObjectWithId(transactions, id);
  dispatch({type: SET_TRANSACTION, payload: newTransactions});
};

const mergeByProperty = (datas, prop) => {
  let mergedData = [];
  datas.forEach(data => {
    let isAvail = mergedData.findIndex(e => e[prop] === data[prop]);
    if (isAvail === -1) {
      mergedData.push(data);
    } else {
      if (mergedData[isAvail].updateAt && data.updateAt) {
        mergedData[isAvail] =
          mergedData[isAvail].updateAt > data.updateAt
            ? mergedData[isAvail]
            : data;
      } else if (data?.updateAt) {
        mergedData[isAvail] = data;
      }
    }
  });
  return mergedData;
};

export const backupData =
  (syncCode = '') =>
  async (dispatch, getState) => {
    dispatch(begin());
    try {
      const {accounts, transactions, sync} = getState().account;
      let getSync = await pb.getList('cake_sync', {
        filter: `(code='${syncCode || sync.code}')`,
      });
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

        dispatch({type: SET_ACCOUNT, payload: mergedAccounts});
        dispatch({type: SET_TRANSACTION, payload: mergedTransactions});

        delete syncDataResult.accounts;
        delete syncDataResult.transactions;
        dispatch({type: SET_SYNC, payload: syncDataResult});
      } else {
        let resultSync = await pb.create('cake_sync', {
          code: syncCode,
          accounts,
          transactions,
        });
        delete resultSync.accounts;
        delete resultSync.transactions;
        dispatch({type: SET_SYNC, payload: resultSync});
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(end());
    }
  };

export const setTemplateData = () => (dispatch, getState) => {
  dispatch({
    type: SET_ACCOUNT,
    payload: [
      {description: '', id: 1668695558043, name: 'Seabank', type: 'cash'},
    ],
  });
  dispatch({
    type: SET_TRANSACTION,
    payload: [
      {
        amount: 100000,
        date: 1668695730230,
        description: '',
        id: 1,
        idAccount: 1668695558043,
        idAccount2: '',
        title: 'Test',
        type: 'expense',
      },
      {
        amount: 10000000,
        date: 1668445199000,
        description: '',
        id: 2,
        idAccount: 1668695558043,
        idAccount2: '',
        title: '10000',
        type: 'income',
      },
    ],
  });
};
