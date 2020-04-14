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
      { title: 'Net Profit', ...propsToMoneyFormat(robotStatistic.netProfit) },
      { title: 'Number of Trades', ...robotStatistic.tradesCount },
      { title: 'Average Profit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'Average Bars Held', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Profit Factor', ...propsSimple(robotStatistic.profitFactor) },
      { title: 'Recovery Factor', ...propsSimple(robotStatistic.recoveryFactor) },
      { title: 'Payoff Ratio', ...propsSimple(robotStatistic.payoffRatio) },
      { title: 'Maximum Drawdawn', ...propsToMoneyFormat(robotStatistic.maxDrawdown) },
      { title: 'Maximum Drawdawn Date', ...formatAsDates(robotStatistic.maxDrawdownDate) }
    ],
    winners: [
      { title: 'Win Rate', ...propsToPercent(robotStatistic.winRate) },
      { title: 'Gross Profit', ...propsToMoneyFormat(robotStatistic.grossProfit) },
      { title: 'Average Profit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'Average Bars Held', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Max. Consecutive Winners', ...robotStatistic.maxConnsecWins }
    ],
    losses: [
      { title: 'Loss Rate', ...propsToPercent(robotStatistic.lossRate) },
      { title: 'Gross Loss', ...propsToMoneyFormat(robotStatistic.grossLoss) },
      { title: 'Average Loss', ...propsToMoneyFormat(robotStatistic.avgLoss) },
      { title: 'Average Bars Held', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Max. Consecutive Losses', ...robotStatistic.maxConsecLosses }
    ]
  })
);

export const tabName = {
  myStatistic: 'My Statistic',
  publicStatistic: 'Public Statistic'
};
