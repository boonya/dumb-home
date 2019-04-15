import { combineReducers } from 'redux';

import { types, SCREEN_TYPE } from '../actions/device';

const list = (state = {pending: true, loading: false, error: null, list: []}, action = {}) => {
  switch (action.type) {
    case types.DEVICE_LIST:
      return {...state, pending: true, loading: true};
    case types.DEVICE_LIST_SUCCESS:
      return {...state, pending: false, loading: false, error: null, list: action.payload};
    case types.DEVICE_LIST_FAILURE:
      return {...state, pending: false, loading: false, error: action.payload};
    default:
      return state;
  }
}

const create = (state = {pending: true, loading: false, error: null, id: null}, action = {}) => {
  switch (action.type) {
    case types.DEVICE_CREATE:
      return {...state, pending: true, loading: true};
    case types.DEVICE_CREATE_SUCCESS:
      return {...state, pending: false, loading: false, error: null, id: action.payload};
    case types.DEVICE_CREATE_FAILURE:
      return {...state, pending: false, loading: false, error: action.payload, id: null};
    default:
      return {pending: true, loading: false, error: null, id: null};
  }
}

const screen = (state = {screenType: SCREEN_TYPE.LIST}, action = {}) => {
  switch (action.type) {
    case types.DEVICE_SCREEN_LIST:
      return {screenType: SCREEN_TYPE.LIST};
    case types.DEVICE_SCREEN_SELECTOR:
      return {screenType: SCREEN_TYPE.SELECTOR};
    case types.DEVICE_SCREEN_CREATE:
      return {screenType: SCREEN_TYPE.CREATE, deviceType: action.payload};
    default:
      return state;
  }
}

const details = (state = {pending: true, loading: false, error: null, details: null}, action = {}) => {
  switch (action.type) {
    case types.DEVICE_DETAILS:
      return {...state, pending: true, loading: true};
    case types.DEVICE_DETAILS_SUCCESS:
      return {...state, pending: false, loading: false, error: null, details: action.payload};
    case types.DEVICE_DETAILS_FAILURE:
      return {...state, pending: false, loading: false, error: action.payload, details: null};
    default:
      return {pending: true, loading: false, error: null, details: null};
  }
}

export default combineReducers({
  list,
  details,
  create,
  screen,
});
