import dayjs from "../../../libs/dayjs";
import { getStats, getVolume, getVolumeWithUnit } from "config/utils";

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
            robot,
            robot_id,
            user_robot_settings: { user_robot_settings }
        } = userRobot;

        const { name, asset, currency, exchange, active, code } = robot;
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);
        return {
            cache: {
                id,
                tableName: "user_robots"
            },
            id: robot_id,
            asset,
            currency,
            exchange,
            settings: user_robot_settings,
            volume: getVolume(user_robot_settings),
            displayedVolume: getVolumeWithUnit(user_robot_settings, { currency, asset }),
            user_robots: {
                status,
                id
            },
            active: active ? dayjs.utc(active).fromNow(true) : active,
            started_at: started_at ? dayjs.utc(started_at).fromNow(true) : 0,
            performance: equity,
            profit,
            name,
            winRate,
            maxDrawdown,
            tradesCount,
            isSubscribed: false,
            code
        };
    }) || [];
