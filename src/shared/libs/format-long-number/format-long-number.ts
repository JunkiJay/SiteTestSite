export const formatLongNumber = (value: string | number) => {
  if (typeof value === 'number') {
    value = value.toString();
  }

  return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};
