import { eventChannel, END } from "redux-saga";
import { call, put, take, cancelled } from "redux-saga/effects";

import { MeteorObservable } from "meteor-rxjs";

/**
 * @typedef {Object} SuccessAction
 * @property {string} type
 * @property {any} [payload]
 */

/**
 * @typedef {Object} FailureAction
 * @property {string} type
 * @property {Error} error
 */

/**
 * @typedef {Object} SubscribeReactiveRequestParams
 * @property {Function} src
 * @property {{success: SuccessAction, failure: FailureAction}} subscribeActions
 * @property {{success: SuccessAction, failure: FailureAction}} unsubscribeActions
 * @property {{success: SuccessAction, failure: FailureAction}} updateActions
 */

/**
 * @param {Function} src
 */
const subscribeReactiveSrc = (src, ...args) => {
  return eventChannel(emitter => {
    const observable = MeteorObservable.autorun().subscribe(
      () => {
        const payload = src(...args);
        emitter({ payload });
      },
      error => {
        emitter({ error });
      },
      () => {
        emitter(END);
      }
    );
    return () => {
      observable.unsubscribe();
    };
  });
};

/**
 * @param {string} collection
 * @param {Function} method
 * @param  {...any} args
 */
const subscribeCollection = (collection, method, ...args) => {
  return eventChannel(emitter => {
    const observable = MeteorObservable.subscribe(collection).subscribe(
      () => {
        const payload = method(...args);
        emitter({ payload });
      },
      error => {
        emitter({ error });
      },
      () => {
        emitter(END);
      }
    );
    return () => {
      observable.unsubscribe();
    };
  });
};

/**
 * @param {SubscribeReactiveRequestParams}
 */
export function* subscribeReactiveSaga({ src, args, subscribeActions, unsubscribeActions, updateActions }) {
  let channel;
  try {
    channel = yield call(subscribeReactiveSrc, src, args);
    yield put(subscribeActions.success(channel));
    while (true) {
      const { payload, error } = yield take(channel);
      if (payload) {
        yield put(updateActions.success(payload));
      }
      if (error) {
        yield put(updateActions.failure(error));
      }
    }
  } catch (err) {
    yield put(subscribeActions.failure(err));
  } finally {
    if (yield cancelled()) {
      yield unsubscribeSaga(channel, unsubscribeActions);
    }
  }
}

export function* subscribeCollectionSaga({
  collection,
  method,
  args,
  subscribeActions,
  unsubscribeActions,
  updateActions,
}) {
  let channel;
  try {
    channel = yield call(subscribeCollection, collection, method, args);
    yield put(subscribeActions.success(channel));
    while (true) {
      const { payload, error } = yield take(channel);
      if (payload) {
        yield put(updateActions.success(payload));
      }
      if (error) {
        yield put(updateActions.failure(error));
      }
    }
  } catch (err) {
    yield put(subscribeActions.failure(err));
  } finally {
    if (yield cancelled()) {
      yield unsubscribeSaga(channel, unsubscribeActions);
    }
  }
}

/**
 * @param {EventChannel} channel
 * @param {{success: SuccessAction, failure: FailureAction}} unsubscribeActions
 */
function* unsubscribeSaga(channel, unsubscribeActions) {
  try {
    channel.close();
    yield put(unsubscribeActions.success());
  } catch (err) {
    yield put(unsubscribeActions.failure());
  }
}
