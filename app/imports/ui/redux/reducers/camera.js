import { combineReducers } from "redux";
import { handleActions } from "redux-actions";

import { NoValue, LoadingState, ErrorState } from "../utils/state";
import actions from "../actions";

const discover = handleActions(
  {
    [actions.camera.discover]: state => new LoadingState(state),
    [actions.camera.discoverSuccess]: (_, { payload }) => payload,
    [actions.camera.discoverFailure]: (state, { payload }) => new ErrorState(payload, state),
    [actions.camera.flushDiscoveryResults]: () => new NoValue(),
  },
  new NoValue()
);

export default combineReducers({ discover });

export const getDiscoveredCameras = ({ camera }) => camera.discover;
