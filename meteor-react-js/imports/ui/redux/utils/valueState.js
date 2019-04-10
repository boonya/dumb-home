import { castArray } from 'lodash';
import PropTypes from 'prop-types';

export class ErrorState {
  /**
   * Create a new error state.
   *
   * @param {Error} error - The error that caused the state.
   * @param {*} previousValue - A reference to the previous value.
   */
  constructor(error, previousValue) {
    this.__type__ = this.constructor.name;

    if (error === null || typeof error !== 'object') {
      this.error = new Error('Invalid error instance passed to ErrorState');
    } else {
      this.error = error;
    }
    this.previousValue = previousValue;
  }
}

export class LoadingState {
  /**
   * Create a new loading state.
   *
   * @param {*} previousValue - A reference to the previous value.
   */
  constructor(previousValue) {
    this.__type__ = this.constructor.name;
    this.previousValue = previousValue;
  }
}

export class NoValue {
  /**
   * Create a new no value state.
   */
  constructor() {
    this.__type__ = this.constructor.name;
  }
}

export const errorValuePropType = PropTypes.instanceOf(ErrorState);
export const loadingValuePropType = PropTypes.instanceOf(LoadingState);
export const noValuePropType = PropTypes.instanceOf(NoValue);

/**
 * Create a prop types validator for stateful values.
 *
 * @param {PropTypes|PropTypes[]} dataTypes - An array of propType functions that can be used on PropTypes.oneOfType.
 * @returns {PropTypes.oneOfType} A PropType.oneOfType function that accepts `dataTypes` as well as value state.
 */
export function stateValueTypePropType(dataTypes = []) {
  const types = castArray(dataTypes);
  return PropTypes.oneOfType([
    errorValuePropType,
    loadingValuePropType,
    noValuePropType,
    ...types,
  ]);
}

/**
 * Is the value set, either to a value or error.
 *
 * @param {*} value - Anything.
 * @returns {boolean} True if is loaded, else false.
 */
export function notLoaded(value) {
  return value instanceof NoValue;
}

/**
 * Is the value set, either to a value or error.
 *
 * @param {*} value - Anything.
 * @returns {boolean} True if is loaded, else false.
 */
export function isLoading(value) {
  return value instanceof LoadingState;
}

/**
 * Value is in an error state.
 *
 * @param {*} value - Anything.
 * @returns {boolean} True if is error, else false.
 */
export function isError(value) {
  return value instanceof ErrorState;
}

/**
 * Any of the values are in an error state.
 *
 * @param {Array<*>} values - An array of any mixed values.
 * @returns {boolean} True if is error, else false.
 */
export function isAnyError(...values) {
  for (const value of values) {
    if (isError(value)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns values that are in an error state.
 *
 * @param {Array<*>} values - An array of any mixed values.
 * @returns {Array<ErrorState} An array of ErrorState objects.
 */
export function someError(...values) {
  return values.filter(isError);
}

/**
 * Value isn't available and is a pending state.
 *
 * @param {*} value - Anything.
 * @returns {boolean} True if is in a pending, else false.
 */
export function isPending(value) {
  return value instanceof NoValue || value instanceof LoadingState;
}

/**
 * On value of values isn't available and is a pending state.
 *
 * @param {Array<*>} values - An array of any mixed values.
 * @returns {boolean} True if is pending, else false.
 */
export function isAnyPending(...values) {
  for (const value of values) {
    if (isPending(value)) {
      return true;
    }
  }
  return false;
}

/**
 * Value is ready to be used as the expected value.
 *
 * @param {*} value - Anything.
 * @returns {boolean} True if has a value, else false.
 */
export function isReady(value) {
  return !(value instanceof NoValue || value instanceof ErrorState || value instanceof LoadingState);
}

/**
 * Values are all ready to be used as the expected value.
 *
 * @param {Array<*>} values - An array of any mixed values.
 * @returns {boolean} True if has a value, else false.
 */
export function isAllReady(...values) {
  for (const value of values) {
    if (!isReady(value)) {
      return false;
    }
  }
  return true;
}
