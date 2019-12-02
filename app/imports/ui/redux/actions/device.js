export default {
  SUBSCRIBE: (payload) => payload,
  UNSUBSCRIBE: (payload) => payload,

  UPDATE_SUCCESS: (payload) => payload,
  UPDATE_FAILURE: (payload) => payload,

  FETCH: (id) => id,
  FETCH_SUCCESS: (payload) => payload,
  FETCH_FAILURE: (err) => err,

  DELETE: (id) => id,
  DELETE_SUCCESS: () => null,
  DELETE_FAILURE: (err) => err,
};
