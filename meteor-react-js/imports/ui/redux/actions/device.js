export default {
  FETCH: id => id,
  FETCH_SUCCESS: payload => payload,
  FETCH_FAILURE: err => err,

  CLEAR: () => null,

  DELETE: id => id,
  DELETE_SUCCESS: () => null,
  DELETE_FAILURE: err => err
};
