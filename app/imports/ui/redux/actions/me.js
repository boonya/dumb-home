export default {
  SUBSCRIBE: () => null,

  UPDATE_SUCCESS: payload => payload,
  UPDATE_FAILURE: payload => payload,

  LOGIN: payload => payload,
  LOGIN_SUCCESS: payload => payload,
  LOGIN_FAILURE: payload => payload,

  LOGOUT: () => null,
  LOGOUT_EVERYWHERE: () => null,
  LOGOUT_SUCCESS: payload => payload,
  LOGOUT_FAILURE: payload => payload,
};
