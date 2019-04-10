import { call, put, takeEvery } from 'redux-saga/effects';

import Devices from '../../../collections/devices';
import { types, actions } from '../actions/device';

function* getList() {
  try {
    const find = async () => Devices.find().fetch();
    const list = yield call(find);
    yield put(actions.deviceListSuccess(list));
  } catch (err) {
    yield put(actions.deviceListFailure(err));
  }
}

function* getDetails({ payload }) {
  try {
    const findOne = async (_id) => Devices.findOne({ _id });
    const item = yield call(findOne, payload);
    if (item) {
      yield put(actions.deviceDetailsSuccess(item));
    } else {
      yield put(actions.deviceDetailFailure(new Error("Device not found")));
    }
  } catch (err) {
    yield put(actions.deviceDetailFailure(err));
  }
}

function* create({ payload }) {
  try {
    const insert = async (data) => Devices.insert(data);
    const deviceId = yield call(insert, payload);
    yield put(actions.deviceCreateSuccess(deviceId));
  } catch (err) {
    yield put(actions.deviceCreateFailure(err));
  }
}

function* showListScreen() {
  yield put(actions.showScreenList());
}

export default function* watch() {
  yield takeEvery(types.DEVICE_LIST, getList);
  yield takeEvery(types.DEVICE_DETAILS, getDetails);
  yield takeEvery(types.DEVICE_CREATE, create);
  yield takeEvery(types.DEVICE_CREATE_SUCCESS, showListScreen);
}
