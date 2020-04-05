import { moneyFormat, formatDate } from '../../../config/utils';

export const tableHeaders = [
  '',
  'All Trades',
  'Long Trades',
  'Short Trades',
];

export const formatAsDates = row => ({
  all: row.all ? formatDate(row.all) : '-',
  long: row.long ? formatDate(row.long) : '-',
  short: row.short ? formatDate(row.short) : '-'
});

export const propsToMoneyFormat = (obj) => Object.keys(obj).reduce((acc, k) => (
  { ...acc, [k]: `${moneyFormat(obj[k])} $` }), {});


export const propsToPercent = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: `${obj[k]} %` }), {});
export const propsSimple = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {});

export const propsToNull = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: obj[k] || '-' }), {});

export const getRobotStatistic = (robotStatistic) => (
  !robotStatistic ? null : ({
    profit: [
      { title: 'netProfit', ...propsToMoneyFormat(robotStatistic.netProfit) },
      { title: 'tradesCount', ...robotStatistic.tradesCount },
      { title: 'avgProfit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'profitFactor', ...propsSimple(robotStatistic.profitFactor) },
      { title: 'recoveryFactor', ...propsSimple(robotStatistic.recoveryFactor) },
      { title: 'payoffRatio', ...propsSimple(robotStatistic.payoffRatio) },
      { title: 'maximumDrawDawn', ...propsToMoneyFormat(robotStatistic.maxDrawdown) },
      { title: 'maximumDrawDawnDate', ...formatAsDates(robotStatistic.maxDrawdownDate) }
    ],
    winners: [
      { title: 'winRate', ...propsToPercent(robotStatistic.winRate) },
      { title: 'grossProfit', ...propsToMoneyFormat(robotStatistic.grossProfit) },
      { title: 'avgProfit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'maxConnsecWins', ...robotStatistic.maxConnsecWins }
    ],
    losses: [
      { title: 'lossRate', ...propsToPercent(robotStatistic.lossRate) },
      { title: 'grossLoss', ...propsToMoneyFormat(robotStatistic.grossLoss) },
      { title: 'avgLoss', ...propsToMoneyFormat(robotStatistic.avgLoss) },
      { title: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'maxConsecLosses', ...robotStatistic.maxConsecLosses }
    ]
  })
);

export const tabName = {
  myStatistic: 'My Statistic',
  publicStatistic: 'Public Statistic'
}