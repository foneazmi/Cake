import {DARK_MODE} from '../types';

export const setDarkMode = darkMode => dispatch => {
  dispatch({type: DARK_MODE, payload: darkMode});
};
