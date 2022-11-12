export const removeObjectWithId = (arr, id) => {
  const objWithIdIndex = arr.findIndex(obj => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return [...arr];
};
