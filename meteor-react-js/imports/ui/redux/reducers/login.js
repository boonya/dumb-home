import { LoadingState, ErrorState } from '../utils/valueState';
import { types } from '../actions/login';

export default (state = null, action = {}) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return new LoadingState(state);
    case types.LOGIN_REQUEST_SUCCESS:
      return action.payload;
    case types.LOGIN_REQUEST_FAILURE:
      return new ErrorState(action.error, state);
    default:
      return state;
  }
}
