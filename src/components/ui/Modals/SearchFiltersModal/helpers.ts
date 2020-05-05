import { exchangeName } from '../../../../config/utils';
import { timeFrameFormat } from '../../../../config/constants';
import { FilterData } from './types';

export const labels = [ 'exchange', 'asset', 'timeframe' ];

const formatData = {
  asset: key => key,
  exchange: key => exchangeName(key),
  timeframe: key => timeFrameFormat[key].abbr
};

const sortFunc = {
  asset: (a, b) => a.key.localeCompare(b.key),
  exchange: (a, b) => a.key.localeCompare(b.key),
  timeframe: (a, b) => a.key - b.key
};

export const getFilterData = filters => {
  const result = filters.reduce(
    (acc: FilterData, item) => {
      labels.forEach(key => {
        if (!acc[key].find(el => el.key === item.robots[key])) {
          acc[key].push({
            key: item.robots[key],
            label: formatData[key](item.robots[key])
          });
        }
      });
      return acc;
    },
    { asset: [], exchange: [], timeframe: [] }
  );
  labels.forEach(key => {
    result[key].sort(sortFunc[key]);
  });

  return result;
};

export const tabNames = {
  filters: 'Filters',
  orders: 'Sort by'
};

export const ordersSortList = [
  { value: 'max_drawdown', label: 'Max drawdown' },
  { value: 'recovery_factor', label: 'Recovery factor' },
  { value: 'win_rate', label: 'Win rate' },
  { value: 'trades_count', label: 'Trades count' }
];

export const ordersSortMethod = {
  max_drawdown: { max_drawdown: 'asc_nulls_last' },
  recovery_factor: { recovery_factor: 'desc_nulls_last' },
  win_rate: { win_rate: 'desc_nulls_last' },
  trades_count: { trades_count: 'desc_nulls_last' }
};
