import dayjs from "libs/dayjs";
import { color } from "config/constants";
import { capitalize } from "config/utils";
import { SectionType } from "./types";

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
            isUserSubscribed: user_signals?.length > 0,
            strategyByStrategy
        },
        user_signals: user_signals?.length ? user_signals[0] : null
    };
};

export const getProfit = (robotData: any) => {
    return robotData?.user_signals?.equity.profit || robotData?.robot.equity.profit || 0;
};

export const getSubscriptionDuration = (robotData: any) =>
    dayjs.utc(robotData?.user_signals.subscribed_at).fromNow(true);

export const activeDays = (robotData: any) =>
    robotData.robot.started_at ? dayjs.utc(robotData.robot.started_at).fromNow(true) : 0;

export const getVolume = ({ robot, user_signals }: any) =>
    robot.isUserSubscribed ? user_signals.volume : robot.volume;

export const floatPositions = {
    signals: {
        title: "Signals",
        empty: "No current Signals",
        activeTab: SectionType.signals
    },
    open: {
        title: "Open positions",
        empty: "No Open Positions",
        activeTab: SectionType.openPositions
    }
};

const dateDiffNotPositive = (checkDate, subscribedAt) => dayjs(subscribedAt).diff(dayjs(checkDate)) <= 0;

const getEntryMarker = (position_entry, candleRobot, asset) => {
    // console.log(position_entry);
    const { entry_action, entry_date, entry_candle_timestamp, entry_price, id, code, status } = position_entry;
    const entryAction = position_entry.entry_action === "short";
    const volume = `${
        candleRobot?.user_signals.length ? candleRobot?.user_signals[0].volume : position_entry.volume
    } ${asset}`;

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
        status,
        exit: false
    };
};

const getExitMarker = (position_exit, candleRobot, asset) => {
    // console.log(position_exit);
    const { exit_action, exit_candle_timestamp, exit_date, exit_price, id, code, status } = position_exit;
    const exitAction = exit_action === "closeShort";
    const volume = `${
        candleRobot?.user_signals.length ? candleRobot?.user_signals[0].volume : position_exit.volume
    } ${asset}`;
    const { profit } = position_exit;
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
        status,
        exit: true
    };
};

export const getCandleChartData = ({ candles }, asset) => {
    if (!candles?.length) return { candles: [], markers: [] };
    let canAddPosition = false;
    return candles.reduceRight(
        (acc, item) => {
            const { candle, position_entry, position_exit, robot } = item;
            if (candle) {
                const { time, open, high, low, close, volume } = candle;
                if (position_entry) {
                    canAddPosition = true;
                    if (robot?.user_signals?.length) {
                        canAddPosition = dateDiffNotPositive(
                            position_entry[0].entry_date,
                            robot?.user_signals[0].subscribed_at
                        );
                    }
                    if (canAddPosition) {
                        const markerItem = getEntryMarker(position_entry[0], robot, asset);
                        acc.markers.push(markerItem);
                    }
                }
                if (position_exit) {
                    canAddPosition = true;
                    if (robot?.user_signals?.length) {
                        canAddPosition = dateDiffNotPositive(
                            position_exit[0].exit_date,
                            robot?.user_signals[0].subscribed_at
                        );
                    }
                    if (canAddPosition) {
                        const markerItem = getExitMarker(position_exit[0], robot, asset);
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
    let updateCandle = {
        time: null,
        open: null,
        high: null,
        low: null,
        close: null,
        volume: null
    };
    const markers = [];
    if (!data?.candles.length) return { updateCandle, markers };
    let canAddPosition = false;
    const { candle, position_entry, position_exit, robot: candleRobot } = data.candles[0];
    if (candle) {
        const { time, open, high, low, close, volume } = candle;
        if (position_entry) {
            canAddPosition = true;
            if (candleRobot?.user_signals.length) {
                canAddPosition = dateDiffNotPositive(
                    position_entry[0].entry_date,
                    candleRobot?.user_signals[0].subscribed_at
                );
            }
            if (canAddPosition) {
                const markerItem = getEntryMarker(position_entry[0], candleRobot, asset);
                markers.push(markerItem);
            }
        }
        if (position_exit) {
            canAddPosition = true;
            if (candleRobot?.user_signals.length) {
                canAddPosition = dateDiffNotPositive(
                    position_exit[0].exit_date,
                    candleRobot?.user_signals[0].subscribed_at
                );
            }
            if (canAddPosition) {
                const markerItem = getExitMarker(position_exit[0], candleRobot, asset);
                markers.push(markerItem);
            }
        }
        updateCandle = { open, high, low, close, volume, time: time / 1000 };
    }
    return { updateCandle, markers };
};

export const getAlerts = (signals) => {
    return signals.reduce((alerts, signal) => {
        if (!Object.keys(signal.alerts).length) return alerts;
        return [
            ...alerts,
            ...Object.entries(signal.alerts).map(([, item]: [any, any]) => {
                const alertColor =
                    item.action === "short" || item.action === "closeLong" ? color.negative : color.positive;
                const axisLabelVisible = true;
                const alertObj = {
                    ...item,
                    volume: signal.volume,
                    code: signal.code,
                    axisLabelVisible,
                    color: alertColor
                };
                return alertObj;
            })
        ];
    }, []);
};

export const createVariable = (robotData, type) => {
    const { robot } = robotData;
    const volume = getVolume(robotData);
    return {
        variables: {
            cache: { id: robot.id, tableName: "charts" },
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
    trading: "Trading",
    myStatistic: "My Performance",
    publicStatistic: "Public Performance"
};
