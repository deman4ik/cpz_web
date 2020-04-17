import { moneyFormat, formatDate, capitalize } from '../../../config/utils';

export const tableHeaders = [
  '',
  'All Trades',
  'Long Trades',
  'Short Trades',
];

const formatAsDates = row => ({
  all: row.all ? formatDate(row.all) : '-',
  long: row.long ? formatDate(row.long) : '-',
  short: row.short ? formatDate(row.short) : '-'
});

const propsToMoneyFormat = (obj) => Object.keys(obj).reduce((acc, k) => (
  { ...acc, [k]: `${moneyFormat(obj[k])} $` }), {});
const propsToPercent = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: `${obj[k]} %` }), {});
const propsSimple = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {});
const propsToNull = obj => Object.keys(obj).reduce((acc, k) => ({ ...acc, [k]: obj[k] || '-' }), {});

export const getRobotStatistic = (robotStatistic) => (
  !robotStatistic ? null : ({
    profit: [
      { title: 'Net Profit', key: 'netProfit', ...propsToMoneyFormat(robotStatistic.netProfit) },
      { title: 'Number of Trades', key: 'tradesCount', ...robotStatistic.tradesCount },
      { title: 'Average Profit', key: 'avgProfit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'Average Bars Held', key: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Profit Factor', key: 'profitFactor', ...propsSimple(robotStatistic.profitFactor) },
      { title: 'Recovery Factor', key: 'recoveryFactor', ...propsSimple(robotStatistic.recoveryFactor) },
      { title: 'Payoff Ratio', key: 'payoffRatio', ...propsSimple(robotStatistic.payoffRatio) },
      { title: 'Maximum Drawdawn', key: 'maxDrawdown', ...propsToMoneyFormat(robotStatistic.maxDrawdown) },
      { title: 'Maximum Drawdawn Date', key: 'maxDrawdownDate', ...formatAsDates(robotStatistic.maxDrawdownDate) }
    ],
    winners: [
      { title: 'Win Rate', key: 'winRate', ...propsToPercent(robotStatistic.winRate) },
      { title: 'Gross Profit', key: 'grossProfit', ...propsToMoneyFormat(robotStatistic.grossProfit) },
      { title: 'Average Profit', key: 'avgProfit', ...propsToMoneyFormat(robotStatistic.avgProfit) },
      { title: 'Average Bars Held', key: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Max. Consecutive Winners', key: 'maxConnsecWins', ...robotStatistic.maxConnsecWins }
    ],
    losses: [
      { title: 'Loss Rate', key: 'lossRate', ...propsToPercent(robotStatistic.lossRate) },
      { title: 'Gross Loss', key: 'grossLoss', ...propsToMoneyFormat(robotStatistic.grossLoss) },
      { title: 'Average Loss', key: 'avgLoss', ...propsToMoneyFormat(robotStatistic.avgLoss) },
      { title: 'Average Bars Held', key: 'avgBarsHeld', ...propsToNull(robotStatistic.avgBarsHeld) },
      { title: 'Max. Consecutive Losses', key: 'maxConsecLosses', ...robotStatistic.maxConsecLosses }
    ]
  })
);

export const tabName = {
  myStatistic: 'My Statistic',
  publicStatistic: 'Public Statistic'
};

export const getCardTitle = (item, subtitle) =>
  `${item.title}${item.key === 'avgBarsHeld' && subtitle !== 'profit' ? ` (${capitalize(subtitle)})` : ''}`;
