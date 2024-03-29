import { getStats, getVolume, getVolumeType, getVolumeWithUnit } from "config/utils";
import dayjs from "libs/dayjs";

export const parseUserSettings = (robot) => {
    return robot.user_signals[0].user_signal_settings.signal_settings;
};

export function parseRobotInfo(robot: any, robotSettings: any) {
    const { id, code, name, exchange, asset, currency } = robot;
    const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);
    return {
        cache: {
            id,
            tableName: "robots"
        },
        id,
        code,
        name,
        exchange,
        asset,
        currency,
        user_robots: {
            status: null,
            id: null
        },
        started_at: null,
        settings: robotSettings,
        volume: getVolume(robotSettings),
        displayedVolume: getVolumeWithUnit(robotSettings, { currency, asset }),
        volumeType: getVolumeType(robotSettings),
        profit,
        performance: equity,
        subscribed: null,
        isSubscribed: false,
        winRate,
        maxDrawdown,
        tradesCount,
        active: null
    };
}

export function attachUserStats(res: any, userSignals: any) {
    const userStats = getStats(userSignals);
    res.profit = userStats.profit;
    res.winRate = userStats.winRate;
    res.maxDrawdown = userStats.maxDrawdown;
    res.tradesCount = userStats.tradesCount;
    res.performance = userStats.equity;
}
const areThereUserSignals = (robot) => robot.user_signals && robot.user_signals.length;

export const formatRobotsData = (data: any) =>
    data.map((robot: any) => {
        const { asset, user_signals, started_at } = robot;
        const {
            robot_settings: { robot_settings }
        } = robot;
        const robotSettings = areThereUserSignals(robot) ? parseUserSettings(robot) : robot_settings;
        const res = parseRobotInfo(robot, robotSettings);

        res.active = started_at ? dayjs.utc(started_at).fromNow(true) : started_at;

        if (user_signals?.length && user_signals[0]?.subscribed_at) {
            const userSignals = user_signals[0];

            res.subscribed = dayjs.utc(userSignals.subscribed_at).fromNow(true);
            res.isSubscribed = true;
            res.volume = `${userSignals.user_signal_settings.signal_settings.volume || 0} ${asset}`;

            attachUserStats(res, userSignals);
        }

        return res;
    });
