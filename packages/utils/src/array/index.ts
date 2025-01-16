import * as _ from 'lodash-es';

export function insert<T>(array: T[], index: number, ...values: T[]) {
  return _.concat(
    _.slice(array, 0, index),
    _.castArray(values),
    _.slice(array, index),
  );
}
