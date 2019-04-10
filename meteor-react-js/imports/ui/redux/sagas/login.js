import { call, put, takeEvery } from 'redux-saga/effects';

import { login } from '../../../api/auth';
import { types, actions } from '../actions/login';

function* loginRequest({ payload }) {
  try {
    const user = yield call(login, payload);
    yield put(actions.loginRequestSuccess(user));
  } catch (err) {
    yield put(actions.loginRequestFailure(err));
  }
}


export default function* authRequest() {
  yield takeEvery(types.LOGIN_REQUEST, loginRequest);
}
