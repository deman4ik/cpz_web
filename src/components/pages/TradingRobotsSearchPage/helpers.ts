import { getStats, getVolume, getVolumeWithUnit } from "config/utils";
import dayjs from "libs/dayjs";

// TODO: refactor
export const formatRobotsData = (data: any) =>
    data
        .filter((el) => el.robot)
        .map(({ robot }: any) => {
            const { id, code, name, exchange, asset, currency, active, user_robots } = robot;
            const {
                robot_settings: { robot_settings }
            } = robot;
            const userRobot = user_robots && user_robots[0];
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
                started_at: null,
                settings: robot_settings,
                volume: getVolume(robot_settings),
                displayedVolume: getVolumeWithUnit(robot_settings, { currency, asset }),
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
                const userRobotSettings = userRobot.user_robot_settings?.user_robot_settings;

                res.user_robots.status = userRobot.status;
                res.user_robots.id = userRobot.id;
                res.settings = userRobotSettings;
                res.volume = getVolume(userRobotSettings);
                res.displayedVolume = getVolumeWithUnit(userRobotSettings, { currency, asset });
                res.started_at = userRobot.started_at ? dayjs.utc(userRobot.started_at).fromNow(true) : 0;
                res.performance = signalEquity;
                res.winRate = signalWinRate;
                res.maxDrawdown = signalMaxDrawdown;
                res.tradesCount = signalTradesCount;
                res.profit = signalProfit;
            }

            return res;
        });
