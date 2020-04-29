export const getLeftOffsetButton = (lastValue: number) =>
  lastValue ? (lastValue.toFixed(2).length - 7) * 6 : 0;
