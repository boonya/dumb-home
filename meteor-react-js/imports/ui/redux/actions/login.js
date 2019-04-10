import { createErrorAction, createSuccessAction } from '../utils/actions';

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN-REQUEST',
  LOGIN_REQUEST_SUCCESS: 'AUTH/LOGIN-REQUEST-SUCCESS',
  LOGIN_REQUEST_FAILURE: 'AUTH/LOGIN-REQUEST-FAILURE',
};

export const actions = {
  loginRequest: (payload) => ({ type: types.LOGIN_REQUEST, payload }),
  loginRequestSuccess: createSuccessAction(types.LOGIN_REQUEST_SUCCESS),
  loginRequestFailure: createErrorAction(types.LOGIN_REQUEST_FAILURE),
};
