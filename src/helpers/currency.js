export const currency = (num, prefix = 'Rp', separator = '. ') => {
  return `${prefix}${separator}${
    !isNaN(num)
      ? Number(num)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      : 0
  }`;
};
