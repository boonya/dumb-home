import { types } from '../actions/me';

export default (state = null, action = {}) => ({
  [types.ME_CHANGE]: action.payload,
})[action.type] || state;
