import {removeObjectWithId} from '../../helpers';
import {
  SET_ACCOUNT,
  SET_ACCOUNT_BACKUP,
  SET_TRANSACTION,
  SET_TRANSACTION_BACKUP,
} from '../types';

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
  console.log('newTransactions', newTransactions);
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

export const formatTransactionsData = () => (dispatch, getState) => {
  const {transactions} = getState().account;
  let formattedData = transactions.map((e, index) => {
    return e.id > 1000000000000
      ? {...e, date: e.id, id: index + 1}
      : {...e, id: index + 1};
  });
  dispatch({
    type: SET_TRANSACTION,
    payload: formattedData,
  });
};

export const backupAccount = () => (dispatch, getState) => {
  const {accounts, transactions} = getState().account;
  dispatch({
    type: SET_TRANSACTION_BACKUP,
    payload: transactions,
  });
  dispatch({
    type: SET_ACCOUNT_BACKUP,
    payload: accounts,
  });
};
