import { getStats, getVolumeWithUnit } from "config/utils";
import dayjs from "libs/dayjs";

export const formatRobotsData = (data: any) =>
    data
        .filter((el) => el.robot)
        .map(({ robot }: any) => {
            const { id, code, name, exchange, asset, currency, started_at, user_signals } = robot;
            const {
                robot_settings: { robot_settings }
            } = robot;
            const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);

            const res = {
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
                volume: getVolumeWithUnit(robot_settings, { currency, asset }),
                profit,
                performance: equity,
                active: started_at ? dayjs.utc(started_at).fromNow(true) : started_at,
                subscribed: null,
                isSubscribed: false,
                winRate,
                maxDrawdown,
                tradesCount
            };

            if (user_signals?.length && user_signals[0]?.subscribed_at) {
                const userSignals = user_signals[0];
                const {
                    equity: signalEquity,
                    profit: signalProfit,
                    winRate: signalWinRate,
                    maxDrawdown: signalMaxDrawdown,
                    tradesCount: signalTradesCount
                } = getStats(userSignals);
                res.subscribed = dayjs.utc(userSignals.subscribed_at).fromNow(true);
                res.isSubscribed = true;
                res.volume = `${userSignals.user_signal_settings.signal_settings.volume || 0} ${asset}`;
                res.profit = signalProfit;
                res.winRate = signalWinRate;
                res.maxDrawdown = signalMaxDrawdown;
                res.tradesCount = signalTradesCount;
                res.performance = signalEquity;
            }

            return res;
        });
