import { getStats } from "config/utils";
import dayjs from "libs/dayjs";

// TODO: refactor
export const formatRobotsData = (v_robots_stats: any) =>
    v_robots_stats.map((el: any) => {
        const { id, code, name, exchange, asset, currency, active, user_robots } = el.robots;
        const {
            robot_settings: { robot_settings }
        } = el.robots;
        const userRobot = user_robots && user_robots[0];
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(el.robots);
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
            started_at: null,
            volume:
                robot_settings.volumeType === "assetStatic"
                    ? `${robot_settings.volume || 0} ${asset}`
                    : `${robot_settings.volumeInCurrency || 0} ${currency}`,
            profit,
            performance: equity,
            active: active ? dayjs.utc(active).fromNow(true) : active,
            isSubscribed: false,
            winRate,
            maxDrawdown,
            tradesCount
        };

        if (userRobot) {
            const {
                equity: signalEquity,
                profit: signalProfit,
                winRate: signalWinRate,
                maxDrawdown: signalMaxDrawdown,
                tradesCount: signalTradesCount
            } = getStats(userRobot);

            res.user_robots.status = userRobot.status;
            res.user_robots.id = userRobot.id;
            res.volume = `${userRobot.user_robot_settings.user_robot_settings.volume} ${asset}`;
            res.started_at = userRobot.started_at ? dayjs.utc(userRobot.started_at).fromNow(true) : 0;
            res.performance = signalEquity;
            res.winRate = signalWinRate;
            res.maxDrawdown = signalMaxDrawdown;
            res.tradesCount = signalTradesCount;
            res.profit = signalProfit;
        }

        return res;
    });
