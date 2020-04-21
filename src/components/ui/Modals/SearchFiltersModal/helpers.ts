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

export const getSearchProps = (data, displayType) => {
  let result = null;
  if (data && data.SearchProps.props) {
    result = data.SearchProps.props.find(el => el.type === displayType);
  }
  return result;
};
