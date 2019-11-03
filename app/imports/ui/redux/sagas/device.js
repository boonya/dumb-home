import { call, put, takeEvery } from "redux-saga/effects";
import actions from "../actions";

import api from "../../../api/devices";

import { notifyFailure } from "../utils/notification";

function* fetcDeviceDetails({ payload }) {
  try {
    const response = yield call(api.findOne, payload);
    yield put(actions.device.fetchSuccess(response));
  } catch (err) {
    yield put(actions.device.fetchFailure(err));
  }
}

function* deleteDevice({ payload }) {
  try {
    yield call(api.remove, payload);
    yield put(actions.device.deleteSuccess());
  } catch (err) {
    yield put(actions.device.deleteFailure(err));
  }
}

export default function* watch() {
  yield takeEvery(actions.device.fetch.toString(), fetcDeviceDetails);
  yield takeEvery(actions.device.fetchFailure.toString(), notifyFailure("Failed to fetch device details"));

  yield takeEvery(actions.device.delete.toString(), deleteDevice);
  yield takeEvery(actions.device.deleteSuccess.toString(), function*() {
    yield put(actions.deviceList.fetch());
  });
  yield takeEvery(actions.device.deleteFailure.toString(), notifyFailure("Failed to delete device"));
}
