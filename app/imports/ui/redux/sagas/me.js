import { call, put, takeEvery, takeLatest, cancel } from "redux-saga/effects";

import api from "../../../api/me";
import { subscribeReactiveSaga } from "../utils/meteor-saga";

import actions from "../actions";
import { notifyFailure } from "./notification";

function* loginRequest({ payload }) {
  try {
    const user = yield call(api.login, payload);
    yield put(actions.me.loginSuccess(user));
  } catch (err) {
    yield put(actions.me.loginFailure(err));
  }
}

function* logoutRequest() {
  try {
    yield call(api.logout);
    yield put(actions.me.logoutSuccess());
  } catch (err) {
    yield put(actions.me.logoutFailure(err));
  }
}

function* logoutEverywhereRequest() {
  try {
    yield call(api.logoutEverywhere);
    yield put(actions.me.logoutSuccess());
  } catch (err) {
    yield put(actions.me.logoutFailure(err));
  }
}

function* subscribeRequest() {
  const task = yield subscribeReactiveSaga({
    src: api.fetch,
    subscribeActions: {
      success: actions.me.subscribeSuccess,
      failure: actions.me.subscribeFailure,
    },
    unsubscribeActions: {
      success: actions.me.unsubscribeSuccess,
      failure: actions.me.unsubscribeFailure,
    },
    updateActions: {
      success: actions.me.updateSuccess,
      failure: actions.me.updateFailure,
    },
  });

  yield takeLatest(
    actions.me.unsubscribe.toString(),
    () =>
      function*() {
        yield cancel(task);
      }
  );
}

export default function* watch() {
  yield takeEvery(actions.me.subscribe.toString(), subscribeRequest);

  yield takeEvery(actions.me.login.toString(), loginRequest);
  yield takeEvery(actions.me.logout.toString(), logoutRequest);
  yield takeEvery(actions.me.logoutEverywhere.toString(), logoutEverywhereRequest);

  yield takeEvery(actions.me.updateFailure.toString(), notifyFailure("Me update failure"));
  yield takeEvery(actions.me.loginFailure.toString(), notifyFailure("Login failure"));
  yield takeEvery(actions.me.logoutFailure.toString(), notifyFailure("Logout failure"));

  yield put(actions.me.subscribe());
}
