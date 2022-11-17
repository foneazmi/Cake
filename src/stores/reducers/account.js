import {
  RESET_ACCOUNT,
  SET_ACCOUNT,
  SET_TRANSACTION,
  SET_TRANSACTION_BACKUP,
  SET_ACCOUNT_BACKUP,
} from '../types';

const INITIAL_STATE = {
  accounts: [],
  transactions: [],

  accounts_backup: [],
  transactions_backup: [],
};

export const account = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, accounts: action.payload};
    case SET_TRANSACTION:
      return {...state, transactions: action.payload};

    case SET_TRANSACTION_BACKUP:
      return {...state, transactions_backup: action.payload};
    case SET_ACCOUNT_BACKUP:
      return {...state, accounts_backup: action.payload};

    case RESET_ACCOUNT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
