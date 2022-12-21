import {
  BEGIN,
  END,
  DARK_MODE,
  RESET_GLOBAL,
  PROGRESS_DESCRIPTION,
} from '../types';

const INITIAL_STATE = {
  // ? Settings
  darkMode: true,
  // ? Misc
  loading: false,
  progressDescription: '',
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
    case PROGRESS_DESCRIPTION:
      return {...state, progressDescription: action.payload};
    case RESET_GLOBAL:
      return INITIAL_STATE;
    // ? Default
    default:
      return state;
  }
};
