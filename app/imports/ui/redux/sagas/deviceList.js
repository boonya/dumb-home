import { call, put, takeEvery } from "redux-saga/effects";
import actions from "../actions";

import api from "../../../api/devices";

import { notifyFailure } from "../utils/notification";

function* fetch() {
  try {
    const response = yield call(api.fetch);
    yield put(actions.deviceList.fetchSuccess(response));
  } catch (err) {
    yield put(actions.deviceList.fetchFailure(err));
  }
}

export default function* watch() {
  yield takeEvery(actions.deviceList.fetch.toString(), fetch);

  yield takeEvery(actions.deviceList.fetchFailure.toString(), notifyFailure("DeviceList fetch failure"));
}
