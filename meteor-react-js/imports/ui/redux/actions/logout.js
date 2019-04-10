import { createErrorAction, createSuccessAction } from '../utils/actions';

export const types = {
  LOGOUT_REQUEST: 'AUTH/LOGOUT-REQUEST',
  LOGOUT_REQUEST_SUCCESS: 'AUTH/LOGOUT-REQUEST-SUCCESS',
  LOGOUT_REQUEST_FAILURE: 'AUTH/LOGOUT-REQUEST-FAILURE',
};

export const actions = {
  logoutRequest: (payload) => ({ type: types.LOGOUT_REQUEST, payload }),
  logoutRequestSuccess: createSuccessAction(types.LOGOUT_REQUEST_SUCCESS),
  logoutRequestFailure: createErrorAction(types.LOGOUT_REQUEST_FAILURE),
};
