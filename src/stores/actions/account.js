import {SET_ACCOUNT, SET_TRANSACTION} from '../types';

export const addAccount = data => (dispatch, getState) => {
  const {accounts} = getState().account;
  dispatch({type: SET_ACCOUNT, payload: [...accounts, data]});
};

export const addTransaction = data => (dispatch, getState) => {
  const {transactions} = getState().account;
  dispatch({type: SET_TRANSACTION, payload: [...transactions, data]});
};
