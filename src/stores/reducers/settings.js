import {DARK_MODE} from '../types';

const INITIAL_STATE = {
  darkMode: false,
};

export const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {...state, DARK_MODE: action.payload};
    default:
      return state;
  }
};
