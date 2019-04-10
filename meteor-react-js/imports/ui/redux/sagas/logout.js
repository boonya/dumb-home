import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  logout,
} from '../../../api/auth';
import {
  types,
  actions,
} from '../actions/logout';

function* logoutRequest() {
  try {
    const user = yield call(logout);
    yield put(actions.logoutRequestSuccess(user));
  } catch (err) {
    yield put(actions.logoutRequestFailure(err));
  }
}

export default function* authRequest() {
  yield takeEvery(types.LOGOUT_REQUEST, logoutRequest);
}
