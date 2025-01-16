import { NonUndefined } from '../utils.types';

/**
 * no falsy
 * @param val
 * @returns
 */
export function noFalsy<T>(val: T): val is NonUndefined<T> {
  return val !== undefined && val !== null && val !== '';
}
