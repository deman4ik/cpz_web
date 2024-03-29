import dayjs from "libs/dayjs";
import { getStats, getVolume, getVolumeWithUnit, getVolumeType } from "config/utils";

// TODO: use formatSignalData to form the array
export const formatSignalRobots = (signals: any) => {
    return (
        signals
            ?.filter((signal) => signal.robot)
            .map(({ robot }: any) => {
                const { id, name, asset, currency, exchange, started_at, code, user_signals } = robot;
                const userSignal = user_signals && user_signals[0];
                const {
                    user_signal_settings: { signal_settings }
                } = userSignal || {};
                const res = {
                    cache: {
                        id,
                        tableName: "robots"
                    },
                    id,
                    asset,
                    currency,
                    exchange,
                    settings: signal_settings,
                    volume: getVolume(signal_settings),
                    displayedVolume: getVolumeWithUnit(signal_settings, { currency, asset }),
                    volumeType: getVolumeType(signal_settings),
                    user_robots: {
                        status: null,
                        id: null
                    },
                    subscribed: dayjs.utc(userSignal?.subscribed_at)?.fromNow(true),
                    active: started_at ? dayjs.utc(started_at).fromNow(true) : started_at,
                    performance: [],
                    profit: 0,
                    name,
                    winRate: 0,
                    maxDrawdown: 0,
                    tradesCount: 0,
                    isSubscribed: true,
                    code
                };
                if (userSignal && userSignal.stats) {
                    const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(userSignal);
                    res.performance = equity;
                    res.profit = profit;
                    res.winRate = winRate;
                    res.maxDrawdown = maxDrawdown;
                    res.tradesCount = tradesCount;
                }
                return res;
            }) || []
    );
};

export const formatTradingRobots = (robots: any) =>
    robots?.map((userRobot: any) => {
        const {
            id,
            status,
            started_at,
            stopped_at,
            robot,
            robot_id,
            user_ex_acc_id,
            user_robot_settings: { user_robot_settings }
        } = userRobot;
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(userRobot);

        const { active, currency, asset, ...restOfRobot } = robot;
        return {
            cache: {
                id,
                tableName: "user_robots"
            },
            id: robot_id,
            settings: user_robot_settings,
            volume: getVolume(user_robot_settings),
            displayedVolume: getVolumeWithUnit(user_robot_settings, { currency, asset }),
            volumeType: getVolumeType(user_robot_settings),
            user_robots: {
                status,
                id
            },
            active: active ? dayjs.utc(active).fromNow(true) : active,
            started_at: started_at ? dayjs.utc(started_at).fromNow(true) : null,
            stopped_at: stopped_at ? dayjs.utc(stopped_at).fromNow(true) : null,
            performance: equity,
            profit,
            winRate,
            maxDrawdown,
            tradesCount,
            isSubscribed: false,
            currency,
            user_ex_acc_id,
            asset,
            ...restOfRobot
        };
    }) || [];
