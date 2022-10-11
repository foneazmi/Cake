import {SET_ACCOUNT} from '../types';

export const addAccount = data => (dispatch, getState) => {
  const {accounts} = getState().global;
  dispatch({type: SET_ACCOUNT, payload: [...accounts, data]});
  // dispatch({type: SET_ACCOUNT, payload: []});
};
