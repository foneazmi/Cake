import {BEGIN, END, LOGOUT, DARK_MODE, RESET_GLOBAL} from '../types';

const INITIAL_STATE = {
  // ? Settings
  darkMode: false,
  // ? Misc
  loading: false,
};

export const global = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // ? Settings
    case DARK_MODE:
      return {...state, darkMode: action.payload};
    // ? Misc
    case BEGIN:
      return {...state, loading: true};
    case END:
      return {...state, loading: false};
    case RESET_GLOBAL:
      return INITIAL_STATE;
    // ? Default
    default:
      return state;
  }
};
