import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { combineEpics } from 'redux-observable';

import config from './reducers/config';
import locale from './reducers/locale';
import notification from './reducers/notification';
import meReducer from './reducers/me';
import deviceListReducer from './reducers/deviceList';
import deviceReducer from './reducers/device';
import cameraReducer from './reducers/camera';

import meEpic from './epics/me';
import cameraEpic from './epics/camera';
import deviceEpic from './epics/device';
import deviceListEpic from './epics/deviceList';

export const createRootReducer = ({ history }) => combineReducers({
  config,
  locale,
  notification,
  router: connectRouter(history),
  me: meReducer,
  deviceList: deviceListReducer,
  device: deviceReducer,
  camera: cameraReducer,
});

export const createRootEpic = () => combineEpics(meEpic, deviceEpic, deviceListEpic, cameraEpic);
