import { getStats, getVolumeWithUnit } from "config/utils";
import dayjs from "libs/dayjs";

export function parseRobotInfo(stats: any, robot: any) {
    const {
        id,
        code,
        name,
        exchange,
        asset,
        currency,
        robot_settings: { robot_settings }
    } = robot;
    const { equity, profit, winRate, maxDrawdown, tradesCount } = stats;
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
        volume: getVolumeWithUnit(robot_settings, { currency, asset }),
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

export const formatRobotsData = (data: any) =>
    data.map((robot: any) => {
        const { asset, user_signals, started_at } = robot;
        const stats = getStats(robot);

        const res = parseRobotInfo(stats, robot);

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
