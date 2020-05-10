import dayjs from '../../../libs/dayjs';
import { color } from '../../../config/constants';
import { capitalize } from '../../../config/utils';
import { SectionType } from './types';

export const formatRobotData = (data) => {
  const {
    id,
    name,
    code,
    mod,
    exchange,
    asset,
    currency,
    strategyByStrategy,
    timeframe,
    available,
    status,
    equity,
    statistics,
    robot_settings,
    started_at,
    user_signals
  } = data.robot[0];
  return {
    robot: {
      id,
      exchange,
      asset,
      name,
      code,
      currency,
      timeframe,
      volume: robot_settings.volume,
      statistics,
      equity,
      available,
      status,
      mod,
      started_at,
      isUserSignals: user_signals.length > 0,
      strategyByStrategy
    },
    user_signals: user_signals.length ? user_signals[0] : null
  };
};

export const getProfit = (robotData: any, isUserSignals: boolean) => {
  const equity = isUserSignals ? robotData.user_signals.equity : robotData.robot.equity;
  return equity ? equity.profit : 0;
};

export const subscribeAt = (robotData: any) => dayjs.utc(robotData.user_signals.subscribed_at).fromNow(true);

export const activeDays = (robotData: any) =>
  robotData.robot.started_at ? dayjs.utc(robotData.robot.started_at).fromNow(true) : 0;

export const getVolume = (robotData: any) =>
  robotData.robot.isUserSignals ? robotData.user_signals.volume : robotData.robot.volume;

export const getFormatDataClosedPositions = (dataClosedPositions, isUserSignals, volume) =>
  dataClosedPositions.robot_positions.map((item) => {
    const { exit_price, entry_price, direction } = item;
    if (isUserSignals) {
      const profit = (exit_price - entry_price) * volume * (direction === 'short' ? -1 : 1);
      return { ...item, volume, profit };
    }
    return item;
  });

export const floatPositions = {
  signals: {
    title: 'Signals',
    empty: 'No current Signals',
    activeTab: SectionType.signals
  },
  open: {
    title: 'Open positions',
    empty: 'No Open Positions',
    activeTab: SectionType.openPositions
  }
};

const compareDates = (checkDate, subscribedAt) => dayjs(subscribedAt).diff(dayjs(checkDate)) <= 0;

const getEntryMarker = (position_entry, candleRobot, asset) => {
  const { entry_action, entry_date, entry_candle_timestamp, entry_price, id, code, status } = position_entry;
  const entryAction = position_entry.entry_action === 'short';
  const volume = `${
    candleRobot.user_signals.length ? candleRobot.user_signals[0].volume : position_entry.volume
  } ${asset}`;

  return {
    time: dayjs.utc(entry_candle_timestamp).valueOf() / 1000,
    tooltipTime: dayjs.utc(entry_date).valueOf() / 1000,
    price: entry_price,
    position: entryAction ? 'aboveBar' : 'belowBar',
    shape: 'circle',
    color: entryAction ? color.negative : color.positive,
    colorAction: entryAction ? color.negative : color.positive,
    id: `${id}_${0}`,
    code,
    action: capitalize(entry_action),
    volume,
    status,
    exit: false
  };
};

const getExitMarker = (position_exit, candleRobot, asset) => {
  const { exit_action, exit_candle_timestamp, exit_date, exit_price, balance, id, code, status } = position_exit;
  const exitAction = exit_action === 'closeShort';
  const volume = `${
    candleRobot.user_signals.length ? candleRobot.user_signals[0].volume : position_exit.volume
  } ${asset}`;
  const profit = candleRobot.user_signals.length
    ? candleRobot.user_signals[0].volume * balance
    : position_exit.profit;
  return {
    time: dayjs.utc(exit_candle_timestamp).valueOf() / 1000,
    tooltipTime: dayjs.utc(exit_date).valueOf() / 1000,
    price: exit_price,
    position: exitAction ? 'belowBar' : 'aboveBar',
    shape: exitAction ? 'arrowUp' : 'arrowDown',
    color: profit > 0 ? color.positive : color.negative,
    colorAction: exitAction ? color.negative : color.positive,
    id: `${id}_${1}`,
    code,
    action: capitalize(exit_action)
      .split(/(?=[A-Z])/)
      .join(' '),
    profit,
    volume,
    status,
    exit: true
  };
};

export const getFormatData = (data, asset) => {
  if (!data || !data.candles.length) return { candles: [], markers: [] };
  let canAddPosition = false;
  return data.candles.reduceRight(
    (acc, item) => {
      const { candle, position_entry, position_exit, robot: candleRobot } = item;
      if (candle) {
        const { time, open, high, low, close, volume } = candle;
        if (position_entry) {
          canAddPosition = true;
          if (candleRobot.user_signals.length) {
            canAddPosition = compareDates(
              position_entry[0].entry_date,
              candleRobot.user_signals[0].subscribed_at
            );
          }
          if (canAddPosition) {
            const markerItem = getEntryMarker(position_entry[0], candleRobot, asset);
            acc.markers.push(markerItem);
          }
        }
        if (position_exit) {
          canAddPosition = true;
          if (candleRobot.user_signals.length) {
            canAddPosition = compareDates(
              position_exit[0].exit_date,
              candleRobot.user_signals[0].subscribed_at
            );
          }
          if (canAddPosition) {
            const markerItem = getExitMarker(position_exit[0], candleRobot, asset);
            acc.markers.push(markerItem);
          }
        }
        acc.candles.push({ open, high, low, close, volume, time: time / 1000 });
      }
      return acc;
    },
    { candles: [], markers: [] }
  );
};

export const getFormatUpdateData = (data, asset) => {
  let candles = {
    time: null,
    open: null,
    high: null,
    low: null,
    close: null,
    volume: null
  };
  const markers = [];
  if (!data || !data.candles.length) return { candles, markers };
  let canAddPosition = false;
  const { candle, position_entry, position_exit, robot: candleRobot } = data.candles[0];
  if (candle) {
    const { time, open, high, low, close, volume } = candle;
    if (position_entry) {
      canAddPosition = true;
      if (candleRobot.user_signals.length) {
        canAddPosition = compareDates(position_entry[0].entry_date, candleRobot.user_signals[0].subscribed_at);
      }
      if (canAddPosition) {
        const markerItem = getEntryMarker(position_entry[0], candleRobot, asset);
        markers.push(markerItem);
      }
    }
    if (position_exit) {
      canAddPosition = true;
      if (candleRobot.user_signals.length) {
        canAddPosition = compareDates(position_exit[0].exit_date, candleRobot.user_signals[0].subscribed_at);
      }
      if (canAddPosition) {
        const markerItem = getExitMarker(position_exit[0], candleRobot, asset);
        markers.push(markerItem);
      }
    }
    candles = { open, high, low, close, volume, time: time / 1000 };
  }
  return { candles, markers };
};

export const getAlerts = (signals) =>
  Object.keys(signals.alerts).length
    ? Object.keys(signals.alerts).map((item) => {
      const colorItem =
                  signals.alerts[item].action === 'short' || signals.alerts[item].action === 'closeLong'
                    ? color.negative
                    : color.positive;
      const axisLabelVisible = true;
      const alertItem = {
        ...signals.alerts[item],
        volume: signals.volume,
        code: signals.code,
        axisLabelVisible,
        color: colorItem
      };
      return alertItem;
    })
    : [];

export const createVariable = (robotData, type) => {
  const { robot } = robotData;
  const volume = getVolume(robotData);
  return {
    variables: {
      cache: { id: robot.id, tableName: 'charts' },
      robot: { id: robot.id, name: robot.name, userRobotId: null },
      subs: {
        volume,
        exchange: robot.exchange,
        asset: robot.asset,
        currency: robot.currency
      },
      type
    }
  };
};

export const tabNames = {
  trading: 'Trading',
  myStatistic: 'My Performance',
  publicStatistic: 'Public Performance'
};
