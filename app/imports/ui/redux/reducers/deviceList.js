import { handleActions } from "redux-actions";

import { NoValue, LoadingState, ErrorState } from "../utils/state";
import actions from "../actions";

export default handleActions(
  {
    [actions.deviceList.fetch]: state => new LoadingState(state),
    [actions.deviceList.fetchSuccess]: (_, { payload }) => payload,
    [actions.deviceList.fetchFailure]: (state, { payload }) => new ErrorState(payload, state),
  },
  new NoValue()
);

export const getDeviceList = ({ deviceList }) => deviceList;
