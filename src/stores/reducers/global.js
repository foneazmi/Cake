import {BEGIN, END, LOGOUT, DARK_MODE, SET_ACCOUNT} from '../types';

const INITIAL_STATE = {
  // ? Accounts
  accounts: [],
  // ? Settings
  darkMode: false,
  // ? Misc
  loading: false,
};

export const global = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ? Accounts
    case SET_ACCOUNT:
      return {...state, accounts: action.payload};
    // ? Settings
    case DARK_MODE:
      return {...state, darkMode: action.payload};
    // ? Misc
    case BEGIN:
      return {...state, loading: true};
    case END:
      return {...state, loading: false};
    case LOGOUT:
      return INITIAL_STATE;
    // ? Default
    default:
      return state;
  }
};
