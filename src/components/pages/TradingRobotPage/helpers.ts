import { capitalize, getStats } from "config/utils";
import { color } from "config/constants";
import dayjs from "libs/dayjs";

// TODO: use DB-like structure
export const formatRobotData = (robot: any) => {
    const { id, exchange, asset, name, currency, timeframe, user_robot, statistics, active } = robot;
    const {
        robot_settings: { robot_settings }
    } = robot;
    const userRobot = user_robot?.length && user_robot[0];
    const volumeTypeIsCurrency = robot_settings.volumeType === "currencyDynamic";
    const displayUnits = volumeTypeIsCurrency ? currency : asset;
    const { equity, profit } = getStats(robot);
    return {
        robot: {
            id,
            exchange,
            asset,
            name,
            currency,
            timeframe,
            volume: `${volumeTypeIsCurrency ? robot_settings.volumeInCurrency : robot_settings.volume} ${
                displayUnits || 0
            }`,
            statistics,
            equity,
            profit,
            active,
            isOwnedByUser: user_robot?.length > 0
        },
        userRobot: user_robot?.length
            ? {
                  ...userRobot,
                  equity: getStats(userRobot).equity,
                  volume: `${userRobot.user_robot_settings.user_robot_settings.volume || 0} ${asset}`
              }
            : null
    };
};

export const createVariable = (robotData, type) =>
    robotData.userRobot
        ? {
              variables: {
                  cache: {
                      id: robotData.userRobot.id,
                      tableName: "userRobot"
                  },
                  robot: {
                      id: robotData.robot.id,
                      name: robotData.robot.name,
                      userRobotId: robotData.userRobot.id
                  },
                  subs: {
                      volume: robotData.userRobot.settings.volume,
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
                      tableName: "userRobot"
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

const getEntryMarker = (position_entry, asset, isOwnedByUser) => {
    const { entry_action, entry_date, entry_candle_timestamp, entry_price, id, code } = position_entry;
    const entryAction = position_entry.entry_action === "short";
    const volume = `${isOwnedByUser ? position_entry.entry_executed : position_entry.volume} ${asset}`;
    return {
        time: dayjs.utc(entry_candle_timestamp).valueOf() / 1000,
        tooltipTime: dayjs.utc(entry_date).valueOf() / 1000,
        price: entry_price,
        position: entryAction ? "aboveBar" : "belowBar",
        shape: "circle",
        color: entryAction ? color.negative : color.positive,
        colorAction: entryAction ? color.negative : color.positive,
        id: `${id}_${0}`,
        code,
        action: capitalize(entry_action),
        volume,
        exit: false
    };
};

const getExitMarker = (position_exit, asset, isOwnedByUser) => {
    const { exit_action, exit_candle_timestamp, exit_date, exit_price, id, code, profit } = position_exit;
    const exitAction = exit_action === "closeShort";
    const volume = `${isOwnedByUser ? position_exit.entry_executed : position_exit.volume} ${asset}`;
    return {
        time: dayjs.utc(exit_candle_timestamp).valueOf() / 1000,
        tooltipTime: dayjs.utc(exit_date).valueOf() / 1000,
        price: exit_price,
        position: exitAction ? "belowBar" : "aboveBar",
        shape: exitAction ? "arrowUp" : "arrowDown",
        color: profit > 0 ? color.positive : color.negative,
        colorAction: exitAction ? color.negative : color.positive,
        id: `${id}_${1}`,
        code,
        action: capitalize(exit_action)
            .split(/(?=[A-Z])/)
            .join(" "),
        profit,
        volume,
        exit: true
    };
};

export const getCandleChartData = (data: any, asset: any, isOwnedByUser: boolean) => {
    if (!data || !data.candles.length) return { candles: [], markers: [], overlay: [] };
    return data.candles.reduceRight(
        (acc, item) => {
            const { candle, position_entry, position_exit } = item;
            if (candle) {
                const { time, open, high, low, close, volume } = candle;
                if (position_entry) {
                    const markerItem = getEntryMarker(position_entry[0], asset, isOwnedByUser);
                    acc.markers.push(markerItem);
                }
                if (position_exit) {
                    const markerItem = getExitMarker(position_exit[0], asset, isOwnedByUser);
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
                    signals[item].action === "short" || signals[item].action === "closeLong"
                        ? color.negative
                        : color.positive,
                axisLabelVisible: true
            }
        ],
        []
    );

export const activeDays = ({ robot }: any) => (robot.active ? dayjs.utc(robot.active).fromNow(true) : null);

export const startedAt = ({ userRobot }: any) =>
    userRobot ? (userRobot.started_at ? dayjs.utc(userRobot.started_at).fromNow(true) : "recently") : null;

export const getProfit = ({ robot, userRobot }: any) => userRobot?.profit || robot?.profit || 0;

export const tabNames = {
    trading: "Trading",
    myStatistic: "My Performance",
    publicStatistic: "Public Performance"
};
