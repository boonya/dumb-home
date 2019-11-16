export default {
  DISCOVER: () => null,
  DISCOVER_SUCCESS: (cams) => cams,
  DISCOVER_FAILURE: (err) => err,

  FLUSH_DISCOVERY_RESULTS: () => null,

  ADD: (params) => params,
  ADD_SUCCESS: (id) => id,
  ADD_FAILURE: (err) => err,

  EDIT: (params) => params,
  EDIT_SUCCESS: (id) => id,
  EDIT_FAILURE: (err) => err,
};
