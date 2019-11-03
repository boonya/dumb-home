import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { connectRouter } from "connected-react-router";
import { combineEpics } from "redux-observable";

import config from "./reducers/config";
import locale from "./reducers/locale";
import notification from "./reducers/notification";
import meReducer from "./reducers/me";
import deviceListReducer from "./reducers/deviceList";
import deviceReducer from "./reducers/device";
import cameraReducer from "./reducers/camera";

import deviceListSaga from "./sagas/deviceList";
import deviceSaga from "./sagas/device";

import meEpic from "./epics/me";
import cameraEpic from "./epics/camera";

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
  const sagas = [deviceListSaga(), deviceSaga()];

  return function* rootSaga() {
    yield all(sagas);
  };
}

export const createRootEpic = () => combineEpics(meEpic, cameraEpic);
