import { combineEpics, ofType } from "redux-observable";
import { switchMap, map } from "rxjs/operators";

import api from "../../../api/camera";
import ROUTES, { goTo } from "../../routes";
import actions from "../actions";
import { notifyFailure } from "../utils/notification";

async function discoverCamera() {
  try {
    const cams = await api.discover();
    return actions.camera.discoverSuccess(cams);
  } catch (err) {
    return actions.camera.discoverFailure(err);
  }
}

async function addCamera({ payload }) {
  try {
    const id = await api.add(payload);
    return actions.camera.addSuccess(id);
  } catch (err) {
    return actions.camera.addFailure(err);
  }
}

async function editCamera({ payload }) {
  try {
    const number = await api.edit(payload);
    if (number < 1) {
      throw new Error("No data changed");
    }
    return actions.camera.editSuccess(payload._id);
  } catch (err) {
    return actions.camera.editFailure(err);
  }
}

const discover = action$ =>
  action$.pipe(
    ofType(actions.camera.discover.toString()),
    switchMap(discoverCamera)
  );

const add = action$ =>
  action$.pipe(
    ofType(actions.camera.add.toString()),
    switchMap(addCamera)
  );

const edit = action$ =>
  action$.pipe(
    ofType(actions.camera.edit.toString()),
    switchMap(editCamera)
  );

const addSuccess = action$ =>
  action$.pipe(
    ofType(actions.camera.addSuccess.toString()),
    map(() => goTo(ROUTES.Dashboard))
  );

const editSuccess = action$ =>
  action$.pipe(
    ofType(actions.camera.editSuccess.toString()),
    map(({ payload }) => goTo(ROUTES.DeviceDetails, { id: payload }))
  );

const discoverFailure = action$ =>
  action$.pipe(
    ofType(actions.camera.discoverFailure.toString()),
    map(notifyFailure("Discovering camera process failure"))
  );

const addFailure = action$ =>
  action$.pipe(
    ofType(actions.camera.addFailure.toString()),
    map(notifyFailure("Add camera failure"))
  );
const editFailure = action$ =>
  action$.pipe(
    ofType(actions.camera.editFailure.toString()),
    map(notifyFailure("Edit camera failure"))
  );

export default combineEpics(discover, add, edit, addSuccess, editSuccess, discoverFailure, addFailure, editFailure);
