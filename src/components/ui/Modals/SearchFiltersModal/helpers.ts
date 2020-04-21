import { exchangeName } from '../../../../config/utils';
import { timeFrameFormat } from '../../../../config/constants';
import { FilterData } from './types';

export const labels = [ 'exchange', 'asset', 'timeframe' ];

const formatData = {
  asset: key => key,
  exchange: key => exchangeName(key),
  timeframe: key => (timeFrameFormat[key].abbr)
};

export const getFilterData = (filters) => {
  const result = filters.reduce((acc: FilterData, item) => {
    labels.forEach(key => {
      if (!acc[key].find(el => el.key === item.robots[key])) {
        acc[key].push({ key: item.robots[key], label: formatData[key](item.robots[key]) });
      }
    });
    return acc;
  }, { asset: [], exchange: [], timeframe: [] });
  labels.forEach(key => {
    result[key].sort((a, b) => a.key - b.key);
  });

  return result;
};

export const getElements = (target, filter) =>
  (filter.length ? target.reduce((acc, item) =>
    (filter.includes(item.key) ? acc : [ ...acc, item.key ]), []) : null);

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
  max_drawdown: { max_drawdown: 'desc_nulls_last', id: 'asc' },
  recovery_factor: { recovery_factor: 'asc_nulls_last', id: 'asc' },
  win_rate: { win_rate: 'asc_nulls_last', id: 'asc' },
  trades_count: { trades_count: 'asc_nulls_last', id: 'asc' }
};
