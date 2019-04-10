import { LoadingState, ErrorState } from '../utils/valueState';
import { types } from '../actions/logout';

export default (state = null, action = {}) => {
  switch (action.type) {
    case types.LOGOUT_REQUEST:
      return new LoadingState(state);
    case types.LOGOUT_REQUEST_SUCCESS:
      return null;
    case types.LOGOUT_REQUEST_FAILURE:
      return new ErrorState(action.error, state);
    default:
      return state;
  }
}
