import { handleActions } from "redux-actions";

import { NoValue, LoadingState, ErrorState } from "../utils/state";
import actions from "../actions";

export default handleActions(
  {
    [actions.me.subscribe]: state => new LoadingState(state),
    [actions.me.login]: state => new LoadingState(state),
    [actions.me.logout]: state => new LoadingState(state),
    [actions.me.logoutEverywhere]: state => new LoadingState(state),

    [actions.me.loginFailure]: (state, { payload }) => new ErrorState(payload, state),
    [actions.me.logoutFailure]: (state, { payload }) => new ErrorState(payload, state),
    [actions.me.updateFailure]: (state, { payload }) => new ErrorState(payload, state),

    [actions.me.loginSuccess]: (_, { payload }) => payload,
    [actions.me.logoutSuccess]: () => new NoValue(),
    [actions.me.updateSuccess]: (_, { payload }) => payload,
  },
  new NoValue()
);

export const getMe = ({ me }) => me;
