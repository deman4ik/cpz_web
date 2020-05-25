import dayjs from "libs/dayjs";

export const formatRobotsData = (v_robots_stats: any) =>
    v_robots_stats.map((el: any) => {
        const { id, code, name, exchange, asset, currency, active, robot_settings, user_robots, equity } = el.robots;

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
            volume: robot_settings.volume,
            profit: equity && equity.profit ? equity.profit : 0,
            performance: equity && equity.changes ? equity.changes : [],
            active: active ? dayjs.utc(active).fromNow(true) : active,
            isSubscribed: false,
            winRate: equity && equity.winRate ? equity.winRate : null,
            maxDrawdown: equity && equity.maxDrawdown ? equity.maxDrawdown : null,
            tradesCount: equity && equity.tradesCount ? equity.tradesCount : null
        };

        if (user_robots.length) {
            res.user_robots.status = user_robots[0].status;
            res.user_robots.id = user_robots[0].id;
            res.volume = user_robots[0].settings.volume;
            res.started_at = user_robots[0].started_at ? dayjs.utc(user_robots[0].started_at).fromNow(true) : 0;
            res.performance = user_robots[0].equity ? user_robots[0].equity.changes || [] : [];
            res.winRate = user_robots[0].equity ? user_robots[0].equity.winRate : null;
            res.maxDrawdown = user_robots[0].equity ? user_robots[0].equity.maxDrawdown : null;
            res.tradesCount = user_robots[0].equity ? user_robots[0].equity.tradesCount : null;
            res.profit = user_robots[0].equity ? user_robots[0].equity.profit : 0;
        }

        return res;
    });
