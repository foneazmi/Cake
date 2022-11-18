import {RESET_ACCOUNT, SET_ACCOUNT, SET_TRANSACTION, SET_SYNC} from '../types';

const INITIAL_STATE = {
  sync: false,
  accounts: [],
  transactions: [],
};

export const account = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, accounts: action.payload};
    case SET_TRANSACTION:
      return {...state, transactions: action.payload};

    case SET_SYNC:
      return {...state, sync: action.payload};

    case RESET_ACCOUNT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
