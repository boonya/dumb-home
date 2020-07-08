import { combineEpics, ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';

import api from '../../../api/camera';
import ROUTES, { goTo } from '../../routes';
import actions from '../actions';
import { notifyFailure } from '../utils/notification';

async function discover() {
  try {
    const cams = await api.discover();
    return actions.camera.discoverSuccess(cams);
  } catch (err) {
    return actions.camera.discoverFailure(err);
  }
}

async function create({ payload }) {
  try {
    const id = await api.add(payload);
    return actions.camera.addSuccess(id);
  } catch (err) {
    return actions.camera.addFailure(err);
  }
}

async function edit({ payload }) {
  try {
    const number = await api.edit(payload);
    if (number < 1) {
      throw new Error('No data changed');
    }
    return actions.camera.editSuccess(payload._id);
  } catch (err) {
    return actions.camera.editFailure(err);
  }
}

async function startRecord({ payload }) {
  try {
    await api.startRecord(payload);
    return actions.camera.startRecordSuccess(payload);
  } catch (err) {
    return actions.camera.startRecordFailure(err);
  }
}

async function stopRecord({ payload }) {
  try {
    await api.stopRecord(payload);
    return actions.camera.stopRecordSuccess(payload);
  } catch (err) {
    return actions.camera.stopRecordFailure(err);
  }
}

export default combineEpics(
  (action$) => action$.pipe(
    ofType(actions.camera.discover.toString()),
    switchMap(discover),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.add.toString()),
    switchMap(create),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.edit.toString()),
    switchMap(edit),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.startRecord.toString()),
    switchMap(startRecord),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.stopRecord.toString()),
    switchMap(stopRecord),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.addSuccess.toString()),
    map(() => goTo(ROUTES.Dashboard)),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.editSuccess.toString()),
    map(({ payload }) => goTo(ROUTES.DeviceDetails, { id: payload })),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.discoverFailure.toString()),
    map(notifyFailure('Discovering camera process failure')),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.addFailure.toString()),
    map(notifyFailure('Add camera failure')),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.editFailure.toString()),
    map(notifyFailure('Edit camera failure')),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.startRecordFailure.toString()),
    map(notifyFailure('Start record failure')),
  ),
  (action$) => action$.pipe(
    ofType(actions.camera.stopRecordFailure.toString()),
    map(notifyFailure('Stop record failure')),
  ),
);
