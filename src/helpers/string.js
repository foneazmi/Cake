export const camelize = (str, separator = '-') => {
  let arr = str.split(separator);
  let capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase(),
  );
  return capital.join('');
};
