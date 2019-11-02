import { put } from "redux-saga/effects";

import actions from "../actions";
import { NOTIFICATION_TYPES } from "../../components/Notification";

export const notifyFailure = message =>
  function*(err) {
    console.error("Failure: ", err);
    yield put(actions.notification.show({ type: NOTIFICATION_TYPES.ERROR, message }));
  };
