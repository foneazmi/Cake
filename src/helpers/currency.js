export const currency = (
  num,
  option = {
    prefix: 'IDR ',
    suffix: '',
    separator: ' ',
  },
) => {
  return `${option?.prefix || ''}${option?.separator || ''}${
    !isNaN(num)
      ? Number(num)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      : 0
  }${option?.suffix || ''}`;
};
