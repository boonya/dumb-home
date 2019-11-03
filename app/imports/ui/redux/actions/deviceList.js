export default {
  FETCH: () => null,
  FETCH_SUCCESS: payload => payload,
  FETCH_FAILURE: payload => payload,

  SUBSCRIBE: () => null,
  SUBSCRIBE_SUCCESS: payload => payload,
  SUBSCRIBE_FAILURE: error => error,

  UNSUBSCRIBE: () => null,
  UNSUBSCRIBE_SUCCESS: payload => payload,
  UNSUBSCRIBE_FAILURE: error => error,

  UPDATE_SUCCESS: payload => payload,
  UPDATE_FAILURE: payload => payload,

  // LIST: () => null,
  // LIST_SUCCESS: (payload) => payload,
  // LIST_FAILURE: (payload) => payload,

  // CREATE: (payload) => payload,
  // CREATE_SUCCESS: (payload) => payload,
  // CREATE_FAILURE: (payload) => payload,

  // DELETE: (payload) => payload,
  // DELETE_SUCCESS: (payload) => payload,
  // DELETE_FAILURE: (payload) => payload,

  // SCREEN_LIST: () => null,
  // SCREEN_SELECTOR: () => null,
  // SCREEN_CREATE: (payload) => payload,

  // DETAILS: (payload) => payload,
  // DETAILS_SUCCESS: (payload) => payload,
  // DETAILS_FAILURE: (payload) => payload,
};

export const SCREEN_TYPE = {
  LIST: "LIST",
  SELECTOR: "SELECTOR",
  CREATE: "CREATE",
};
