import {combineReducers} from 'redux';
import {persistStore} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import {persistAccount, persistGlobal} from './reducers';
import {configureStore} from '@reduxjs/toolkit';
import {loggerMiddleware} from './middleware';

const reducer = combineReducers({
  global: persistGlobal,
  account: persistAccount,
});

export const store = configureStore({
  reducer,
  middleware: [loggerMiddleware, thunkMiddleware],
});

export const persistor = persistStore(store);
