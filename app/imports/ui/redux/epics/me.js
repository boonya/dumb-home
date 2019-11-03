import { combineEpics, ofType } from "redux-observable";
import { switchMap, map } from "rxjs/operators";

import api from "../../../api/me";

import actions from "../actions";
import { notifyFailure } from "../utils/notification";

async function loginRequest({ payload }) {
  try {
    const user = await api.login(payload);
    return actions.me.loginSuccess(user);
  } catch (err) {
    return actions.me.loginFailure(err);
  }
}

async function logoutRequest() {
  try {
    await api.logout();
    return actions.me.logoutSuccess();
  } catch (err) {
    return actions.me.logoutFailure(err);
  }
}

async function logoutEverywhereRequest() {
  try {
    await api.logoutEverywhere();
    return actions.me.logoutSuccess();
  } catch (err) {
    return actions.me.logoutFailure(err);
  }
}

const login = action$ =>
  action$.pipe(
    ofType(actions.me.login.toString()),
    switchMap(loginRequest)
  );

const logout = action$ =>
  action$.pipe(
    ofType(actions.me.logout.toString()),
    switchMap(logoutRequest)
  );

const logoutEverywhere = action$ =>
  action$.pipe(
    ofType(actions.me.logoutEverywhere.toString()),
    switchMap(logoutEverywhereRequest)
  );

const notifyLoginFailure = action$ =>
  action$.pipe(
    ofType(actions.me.loginFailure.toString()),
    map(notifyFailure("Login failure"))
  );

const notifyLogoutFailure = action$ =>
  action$.pipe(
    ofType(actions.me.logoutFailure.toString()),
    map(notifyFailure("Logout failure"))
  );

const subscribe = action$ =>
  action$.pipe(
    ofType(actions.me.subscribe.toString()),
    switchMap(api.observable),
    map(actions.me.updateSuccess)
  );

export default combineEpics(subscribe, login, logout, logoutEverywhere, notifyLoginFailure, notifyLogoutFailure);
