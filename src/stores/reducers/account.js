import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  RESET_ACCOUNT,
  SET_FEATURES,
  SET_ACCOUNT,
  SET_TRANSACTION,
  SET_SYNC,
} from '../types';

const INITIAL_STATE = {
  sync: false,
  features: [],
  accounts: [],
  transactions: [],
};

export const account = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {...state, accounts: action.payload};
    case SET_TRANSACTION:
      return {...state, transactions: action.payload};
    case SET_FEATURES:
      return {...state, features: action.payload};
    case SET_SYNC:
      return {...state, sync: action.payload};
    case RESET_ACCOUNT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const persistAccount = persistReducer(
  {
    key: 'account',
    storage: AsyncStorage,
  },
  account,
);
