import {RESET_ACCOUNT, SET_ACCOUNT, SET_TRANSACTION} from '../types';

const INITIAL_STATE = {
  accounts: [],
  transactions: [],
};

export const account = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, accounts: action.payload};
    case SET_TRANSACTION:
      return {...state, transactions: action.payload};
    case RESET_ACCOUNT:
      return INITIAL_STATE;
    default:
      return state;
  }
};