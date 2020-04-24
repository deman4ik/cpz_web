import { moneyFormat } from '../../../config/utils';

export const actionText = {
  start: 'It is a realtime automated trading mode using your exchange account and you use it at your own risk!',
  delete: 'You will lost all trading history for this robot!',
  stop: 'If there is any <b>open positions</b> created by this robot they will be <b>canceled</b> (closed) with current market prices and potentially may cause profit <b>losses</b>!'
};

export const getLimits = data => {
  const result = { asset: { min: 0, max: 0 }, price: 0 };
  if (data.markets.length) {
    result.asset = data.markets[0].limits.amount;
    result.asset.min = result.asset.min < 0.001 ? 0.001 : result.asset.min;
  }
  if (data.candles1440.length) {
    const { high, low } = data.candles1440[0];
    result.price = (high + low) / 2;
  }
  return result;
};

export const calculateCurrency = (asset: string, price: number) =>
  moneyFormat(Number(asset) * price);

export const calculateAsset = (currency: string, price: number) =>
  (price === 0 ? '0' : moneyFormat(Number(currency) / price, 3));
