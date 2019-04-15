import { createErrorAction, createSuccessAction } from '../utils/actions';

export const types = {
  DEVICE_LIST: 'DEVICE_LIST',
  DEVICE_LIST_SUCCESS: 'DEVICE_LIST_SUCCESS',
  DEVICE_LIST_FAILURE: 'DEVICE_LIST_FAILURE',

  DEVICE_CREATE: 'DEVICE_CREATE',
  DEVICE_CREATE_SUCCESS: 'DEVICE_CREATE_SUCCESS',
  DEVICE_CREATE_FAILURE: 'DEVICE_CREATE_FAILURE',

  DEVICE_DELETE: 'DEVICE_DELETE',
  DEVICE_DELETE_SUCCESS: 'DEVICE_DELETE_SUCCESS',
  DEVICE_DELETE_FAILURE: 'DEVICE_DELETE_FAILURE',

  DEVICE_SCREEN_LIST: 'DEVICE_SCREEN_LIST',
  DEVICE_SCREEN_SELECTOR: 'DEVICE_SCREEN_SELECTOR',
  DEVICE_SCREEN_CREATE: 'DEVICE_SCREEN_CREATE',

  DEVICE_DETAILS: 'DEVICE_DETAILS',
  DEVICE_DETAILS_SUCCESS: 'DEVICE_DETAILS_SUCCESS',
  DEVICE_DETAILS_FAILURE: 'DEVICE_DETAILS_FAILURE',
};

export const actions = {
  deviceList: () => ({type: types.DEVICE_LIST}),
  deviceListSuccess: createSuccessAction(types.DEVICE_LIST_SUCCESS),
  deviceListFailure: createErrorAction(types.DEVICE_LIST_FAILURE),

  deviceCreate: payload => ({ type: types.DEVICE_CREATE, payload }),
  deviceCreateSuccess: createSuccessAction(types.DEVICE_CREATE_SUCCESS),
  deviceCreateFailure: createErrorAction(types.DEVICE_CREATE_FAILURE),

  deviceDelete: payload => ({ type: types.DEVICE_DELETE, payload }),
  deviceDeleteSuccess: createSuccessAction(types.DEVICE_DELETE_SUCCESS),
  deviceDeleteFailure: createErrorAction(types.DEVICE_DELETE_FAILURE),

  showScreenList: () => ({ type: types.DEVICE_SCREEN_LIST }),
  showScreenSelector: () => ({ type: types.DEVICE_SCREEN_SELECTOR }),
  showScreenCreate: payload => ({ type: types.DEVICE_SCREEN_CREATE, payload }),

  deviceDetails: payload => ({ type: types.DEVICE_DETAILS, payload }),
  deviceDetailsSuccess: payload => ({ type: types.DEVICE_DETAILS_SUCCESS, payload }),
  deviceDetailFailure: payload => ({ type: types.DEVICE_DETAILS_FAILURE, payload }),
};

export const SCREEN_TYPE = {
  LIST: 'LIST',
  SELECTOR: 'SELECTOR',
  CREATE: 'CREATE',
};
