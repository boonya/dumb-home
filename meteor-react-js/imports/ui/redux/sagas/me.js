import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import { types } from '../actions/me';

function* takeUser() {
  yield put({ type: types.ME_CHANGE, payload: Meteor.user() });
}

function* watchUserUpdate() {
  const channel = eventChannel((emitter) => {
    Tracker.autorun(() => { emitter({ payload: Meteor.user() }) });
    return () => null;
  });

  while (true) {
    const { payload } = yield take(channel);
    yield put({ type: types.ME_CHANGE, payload });
  }
}

export default function* watch() {
  yield takeUser();
  yield watchUserUpdate();
}
