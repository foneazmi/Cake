import {
  BEGIN,
  END,
  RESET_GLOBAL,
  RESET_ACCOUNT,
  PROGRESS_DESCRIPTION,
} from '../types';

export const setProgressDescription =
  (description = '') =>
  dispatch => {
    dispatch({type: PROGRESS_DESCRIPTION, payload: description});
  };

export const begin = () => dispatch => {
  dispatch({type: BEGIN});
};

export const end = () => dispatch => {
  dispatch({type: END});
};

export const setLoading =
  (timer = 1000) =>
  dispatch => {
    dispatch({type: BEGIN});
    setTimeout(() => {
      dispatch({type: END});
    }, timer);
  };

export const resetAll = () => dispatch => {
  dispatch({type: RESET_GLOBAL});
  dispatch({type: RESET_ACCOUNT});
};
