import {removeObjectWithId} from '../../helpers';
import {SET_ACCOUNT, SET_TRANSACTION} from '../types';

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
  dispatch({type: SET_TRANSACTION, payload: [data, ...transactions]});
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
