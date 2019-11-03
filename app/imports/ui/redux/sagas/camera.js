import { put, call, takeEvery } from "redux-saga/effects";

import { discover, add, edit } from "../../../api/camera";
import ROUTES, { goTo } from "../../routes";
import actions from "../actions";

import { notifyFailure } from "../utils/notification";

function* addCamera({ payload }) {
  try {
    const id = yield call(add, payload);
    yield put(actions.camera.addSuccess(id));
  } catch (err) {
    yield put(actions.camera.addFailure(err));
  }
}

function* editCamera({ payload }) {
  try {
    const number = yield call(edit, payload);
    if (number < 1) {
      throw new Error("No data changed");
    }
    yield put(actions.camera.editSuccess(payload._id));
  } catch (err) {
    yield put(actions.camera.editFailure(err));
  }
}

function* discoverCamera() {
  try {
    const cams = yield call(discover);
    yield put(actions.camera.discoverSuccess(cams));
  } catch (err) {
    yield put(actions.camera.discoverFailure(err));
  }
}

export default function* watch() {
  yield takeEvery(actions.camera.discover.toString(), discoverCamera);
  yield takeEvery(actions.camera.add.toString(), addCamera);
  yield takeEvery(actions.camera.edit.toString(), editCamera);

  yield takeEvery(actions.camera.addSuccess.toString(), function*() {
    yield put(goTo(ROUTES.Dashboard));
  });

  yield takeEvery(actions.camera.editSuccess.toString(), function*({ payload }) {
    yield put(goTo(ROUTES.DeviceDetails, { id: payload }));
  });

  yield takeEvery(actions.camera.discoverFailure.toString(), notifyFailure("Discovering camera process failure"));
  yield takeEvery(actions.camera.addFailure.toString(), notifyFailure("Add camera failure"));
  yield takeEvery(actions.camera.editFailure.toString(), notifyFailure("Edit camera failure"));
  // yield takeEvery(actions.camera.getStreamFailure.toString(), notifyFailure("Get camera stream failure"));
}
