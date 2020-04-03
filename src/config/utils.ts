export const moneyFormat = (value: number, toFixed = 2): string => (
  !value ? '0' : value.toFixed(toFixed).toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','));

export const valueWithSign = (value: number | string): string =>
  (Number(value) > 0 ? `+${value}` : `${value}`);

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
