import { combineEpics, ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';

import api from '../../../api/devices';
import actions from '../actions';
import { notifyFailure } from '../utils/notification';

async function fetchDeviceDetails({ payload }) {
  try {
    const response = await api.findOne(payload);
    return actions.device.fetchSuccess(response);
  } catch (err) {
    return actions.device.fetchFailure(err);
  }
}

async function removeDevice({ payload }) {
  try {
    await api.remove(payload);
    return actions.device.deleteSuccess();
  } catch (err) {
    return actions.device.deleteFailure(err);
  }
}

const subscribe = (action$) => action$.pipe(
  ofType(actions.device.subscribe.toString()),
  switchMap(api.observableDevice.subscribe),
  map(actions.device.updateSuccess),
);

const unsubscribe = (action$) => action$.pipe(
  ofType(actions.device.unsubscribe.toString()),
  switchMap(api.observableDevice.unsubscribe),
);

const fetch = (action$) => action$.pipe(
  ofType(actions.device.fetch.toString()),
  switchMap(fetchDeviceDetails),
);

const fetchFailure = (action$) => action$.pipe(
  ofType(actions.device.fetchFailure.toString()),
  map(notifyFailure('Failed to fetch device details')),
);

const remove = (action$) => action$.pipe(
  ofType(actions.device.delete.toString()),
  switchMap(removeDevice),
);

const removeSuccess = (action$) => action$.pipe(
  ofType(actions.device.deleteSuccess.toString()),
  map(() => actions.deviceList.fetch()),
);

const removeFailure = (action$) => action$.pipe(
  ofType(actions.device.deleteFailure.toString()),
  map(notifyFailure('Failed to delete device')),
);

export default combineEpics(subscribe, unsubscribe, fetch, fetchFailure, remove, removeSuccess, removeFailure);
