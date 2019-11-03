import { combineEpics, ofType } from "redux-observable";
import { switchMap, map } from "rxjs/operators";

import api from "../../../api/devices";
import actions from "../actions";
import { notifyFailure } from "../utils/notification";

async function fetchList() {
  try {
    const response = await api.fetch();
    return actions.deviceList.fetchSuccess(response);
  } catch (err) {
    return actions.deviceList.fetchFailure(err);
  }
}

const fetch = action$ =>
  action$.pipe(
    ofType(actions.deviceList.fetch.toString()),
    switchMap(fetchList)
  );

const fetchFailure = action$ =>
  action$.pipe(
    ofType(actions.deviceList.fetchFailure.toString()),
    map(notifyFailure("DeviceList fetch failure"))
  );

export default combineEpics(fetch, fetchFailure);
