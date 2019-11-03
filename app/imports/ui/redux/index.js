import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";

import config from "./reducers/config";
import locale from "./reducers/locale";
import notification from "./reducers/notification";
import meReducer from "./reducers/me";
import deviceListReducer from "./reducers/deviceList";
import deviceReducer from "./reducers/device";
import cameraReducer from "./reducers/camera";

import meSaga from "./sagas/me";
import deviceListSaga from "./sagas/deviceList";
import deviceSaga from "./sagas/device";
import cameraSaga from "./sagas/camera";

export const createRootReducer = ({ history }) =>
  combineReducers({
    config,
    locale,
    notification,
    router: connectRouter(history),
    me: meReducer,
    deviceList: deviceListReducer,
    device: deviceReducer,
    camera: cameraReducer,
  });

export function createRootSaga() {
  const sagas = [meSaga(), deviceListSaga(), deviceSaga(), cameraSaga()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
