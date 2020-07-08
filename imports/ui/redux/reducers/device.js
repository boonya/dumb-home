import { handleActions } from 'redux-actions';

import { NoValue, LoadingState, ErrorState } from '../utils/state';
import actions from '../actions';

export default handleActions(
  {
    [actions.device.fetch]: (state) => new LoadingState(state),
    [actions.device.fetchSuccess]: (_, { payload }) => payload,
    [actions.device.fetchFailure]: (state, { payload }) => new ErrorState(payload, state),

    [actions.device.subscribe]: (state) => new LoadingState(state),
    [actions.device.unsubscribe]: () => new NoValue(),
    [actions.device.updateSuccess]: (_, { payload }) => payload,
    [actions.device.updateFailure]: (state, { payload }) => new ErrorState(payload, state),

    [actions.device.delete]: (state) => new LoadingState(state),
    [actions.device.deleteSuccess]: () => new NoValue(),
    [actions.device.deleteFailure]: (state, { payload }) => new ErrorState(payload, state),
  },
  new NoValue(),
);

export const getDevice = ({ device }) => device;
