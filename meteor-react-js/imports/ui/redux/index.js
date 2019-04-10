import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { all } from 'redux-saga/effects';

import loginReducer from './reducers/login';
import logoutReducer from './reducers/logout';
import meReducer from './reducers/me';
import deviceReducer from './reducers/device';

import loginSaga from './sagas/login';
import logoutSaga from './sagas/logout';
import meSaga from './sagas/me';
import devicesSaga from './sagas/device';

export const rootReducer = combineReducers({
  me: reduceReducers(loginReducer, logoutReducer, meReducer),
  device: deviceReducer,
});

export function* rootSaga() {
  yield all([
    loginSaga(),
    logoutSaga(),
    meSaga(),
    devicesSaga(),
  ]);
}
