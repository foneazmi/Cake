export const removeObjectWithId = (arr, id) => {
  const objWithIdIndex = arr.findIndex(obj => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return [...arr];
};

export const mergeByProperty = (datas, prop) => {
  let mergedData = [];
  datas.forEach(data => {
    let isAvail = mergedData.findIndex(e => e[prop] === data[prop]);
    if (isAvail === -1) {
      mergedData.push(data);
    } else {
      if (mergedData[isAvail].updatedAt && data.updatedAt) {
        mergedData[isAvail] =
          mergedData[isAvail].updatedAt > data.updatedAt
            ? mergedData[isAvail]
            : data;
      } else if (data?.updatedAt) {
        mergedData[isAvail] = data;
      }
    }
  });
  return mergedData;
};
