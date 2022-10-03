import {BEGIN, END} from '../types';

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
