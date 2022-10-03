import {BEGIN, END, LOGOUT} from '../types';

const INITIAL_STATE = {
  loading: false,
};

export const global = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BEGIN:
      return {...state, loading: true};
    case END:
      return {...state, loading: false};
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
