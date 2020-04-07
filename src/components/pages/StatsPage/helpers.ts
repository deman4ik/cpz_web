import { getRobotStatistic } from '../../../services/Signals';
import dayjs from '../../../libs/dayjs';
import { exchangeName } from '../../../services/Utils';
import { CheckedFilters } from './types';

export const getFormatData = stats => {
  if (!stats.length || !stats[0].statistics.performance) return { chartData: null, robotStatistic: null };
  return ({
    chartData: stats[0].statistics.performance.map(pos => ({
      time: dayjs.utc(pos.x / 1000).valueOf(), value: pos.y
    })),
    robotStatistic: getRobotStatistic(stats[0].statistics)
  });
};

export const getSubTitle = (checkedFilters: CheckedFilters) => (
  Object.keys(checkedFilters).map(filter => (filter ? exchangeName(checkedFilters[filter]) : '')).join(' ')
);

export const getLabelCombinations = filters => filters.reduce((acc, item) => {
  Object.keys(item).forEach(key => {
    if (key !== '__typename' && item[key] && !acc[key].includes(item[key])) {
      acc[key].push(item[key]);
    }
  });
  return acc;
}, { exchange: [], asset: [] });

export const getQueueType = (displayType: string) => (
  { _eq: displayType === 'signals' ? 'signal' : 'userRobot' }
);
