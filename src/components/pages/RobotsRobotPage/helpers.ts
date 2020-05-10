import { capitalize } from '../../../config/utils';
import { color } from '../../../config/constants';
import dayjs from '../../../libs/dayjs';

export const formatRobotData = (data: any) => {
  const {
    id,
    exchange,
    asset,
    name,
    currency,
    timeframe,
    user_robots,
    robot_settings,
    statistics,
    equity,
    active
  } = data.robot[0];
  return {
    robot: {
      id,
      exchange,
      asset,
      name,
      currency,
      timeframe,
      volume: robot_settings.volume,
      statistics,
      equity,
      active,
      isUserRobot: user_robots.length > 0
    },
    user_robots: user_robots.length ? user_robots[0] : null
  };
};

export const createVariable = (robotData, type) =>
  robotData.user_robots
    ? {
      variables: {
        cache: {
          id: robotData.user_robots.id,
          tableName: 'user_robots'
        },
        robot: {
          id: robotData.robot.id,
          name: robotData.robot.name,
          userRobotId: robotData.user_robots.id
        },
        subs: {
          volume: robotData.user_robots.settings.volume,
          exchange: robotData.robot.exchange,
          asset: robotData.robot.asset,
          currency: robotData.robot.currency
        },
        type
      }
    }
    : {
      variables: {
        cache: {
          id: robotData.robot.id,
          tableName: 'user_robots'
        },
        robot: {
          id: robotData.robot.id,
          name: robotData.robot.name,
          userRobotId: null
        },
        subs: {
          volume: robotData.robot.volume,
          exchange: robotData.robot.exchange,
          asset: robotData.robot.asset,
          currency: robotData.robot.currency
        },
        type
      }
    };

const getEntryMarker = (position_entry, candleRobot, asset, isUserRobots) => {
  const { entry_action, entry_date, entry_candle_timestamp, entry_price, id, code } = position_entry;
  const entryAction = position_entry.entry_action === 'short';
  const volume = `${isUserRobots ? position_entry.entry_executed : position_entry.volume} ${asset}`;
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
    exit: false
  };
};

const getExitMarker = (position_exit, candleRobot, asset, isUserRobots) => {
  const { exit_action, exit_candle_timestamp, exit_date, exit_price, id, code, profit } = position_exit;
  const exitAction = exit_action === 'closeShort';
  const volume = `${isUserRobots ? position_exit.entry_executed : position_exit.volume} ${asset}`;
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
    exit: true
  };
};

export const getFormatData = (data, asset, isUserRobots) => {
  if (!data || !data.candles.length) return { candles: [], markers: [], overlay: [] };
  return data.candles.reduceRight(
    (acc, item) => {
      const { candle, position_entry, position_exit, user_robot: candleRobot } = item;
      if (candle) {
        const { time, open, high, low, close, volume } = candle;
        if (position_entry) {
          const markerItem = getEntryMarker(position_entry[0], candleRobot, asset, isUserRobots);
          acc.markers.push(markerItem);
        }
        if (position_exit) {
          const markerItem = getExitMarker(position_exit[0], candleRobot, asset, isUserRobots);
          acc.markers.push(markerItem);
        }
        acc.candles.push({ open, high, low, close, volume, time: time / 1000 });
      }
      return acc;
    },
    { candles: [], markers: [], overlay: [] }
  );
};

export const getFormatSignals = (signals) =>
  Object.keys(signals).reduce(
    (acc, item) => [
      ...acc,
      {
        price: signals[item].price,
        color:
                    signals[item].action === 'short' || signals[item].action === 'closeLong'
                      ? color.negative
                      : color.positive,
        axisLabelVisible: true
      }
    ],
    []
  );

export const activeDays = (robotData: any) =>
  robotData.robot.active ? dayjs.utc(robotData.robot.active).fromNow(true) : null;

export const startedAt = (robotData: any) =>
  robotData.user_robots
    ? robotData.user_robots.started_at
      ? dayjs.utc(robotData.user_robots.started_at).fromNow(true)
      : 0
    : null;

export const getProfit = (robotData: any, isUserRobots: boolean) =>
  isUserRobots
    ? robotData.user_robots.equity && robotData.user_robots.equity.profit
      ? robotData.user_robots.equity.profit
      : 0
    : robotData.robot.equity.profit;

export const tabNames = {
  trading: 'Trading',
  myStatistic: 'My Performance',
  publicStatistic: 'Public Performance'
};
