import { capitalize, exchangeName } from '../../../config/utils';

const getLineName = (
  exchange: string | null,
  asset: string | null,
  type: string
) =>
  (!exchange && !asset
    ? `Total ${type}`
    : `${exchange ? exchangeName(exchange) : ''}${
      asset && exchange ? ' ' : ''
    }${asset ? capitalize(asset) : ''}`);

const getAssetData = (stat, type) => {
  const { id, asset, exchange, equity } = stat;
  const { profit, changes, winRate, maxDrawdown, tradesCount } = equity;
  return {
    id,
    name: getLineName(exchange, asset, type),
    profit,
    changes,
    winRate,
    maxDrawdown,
    tradesCount,
    path: `exchange=${exchange}&asset=${asset}`
  };
};

export const getFormatData = (stats, type) =>
  stats.reduce(
    (acc, stat) =>
      ((!stat.asset && !stat.exchange) || (stat.asset && stat.exchange)
        ? [ ...acc, getAssetData(stat, type) ]
        : acc),
    []
  );

export const getItem = (displayType: string) => ({
  id: '',
  name: `Total ${displayType}`,
  profit: 0,
  changes: [],
  winRate: 0,
  maxDrawdown: 0,
  tradesCount: 0,
  path: `exchange=${null}&asset=${null}`
});

export const queryParam = {
  signals: 'signal',
  robots: 'userRobot'
};

export const title = {
  signals: 'My Signals Total Performance',
  robots: 'My Robots Total Performance'
};
