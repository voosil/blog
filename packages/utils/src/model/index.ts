/**
 * find target in array by id
 * @param data
 * @param id
 * @returns
 */
export function findById<D extends { id: number }>(
  data?: D[],
  id?: number | null,
) {
  return data?.find(({ id: _id }) => id === _id);
}
