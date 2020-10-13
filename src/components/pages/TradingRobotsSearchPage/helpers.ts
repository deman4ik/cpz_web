import dayjs from "libs/dayjs";

// TODO: refactor
export const formatRobotsData = (v_robots_stats: any) =>
    v_robots_stats.map((el: any) => {
        const { id, code, name, exchange, asset, currency, active, user_robots, stats } = el.robots;
        const {
            robot_settings: { robot_settings }
        } = el.robots;
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
            profit: stats?.profit || 0,
            performance: stats?.equity || [],
            active: active ? dayjs.utc(active).fromNow(true) : active,
            isSubscribed: false,
            winRate: stats && stats.winRate ? stats.winRate : null,
            maxDrawdown: stats && stats.maxDrawdown ? stats.maxDrawdown : null,
            tradesCount: stats && stats.tradesCount ? stats.tradesCount : null
        };

        if (user_robots?.length) {
            res.user_robots.status = user_robots[0].status;
            res.user_robots.id = user_robots[0].id;
            res.volume = `${user_robots[0].user_robot_settings.user_robot_settings.volume} ${asset}`;
            res.started_at = user_robots[0].started_at ? dayjs.utc(user_robots[0].started_at).fromNow(true) : 0;
            res.performance = user_robots[0].stats?.equity || [];
            res.winRate = user_robots[0].stats?.winRate || null;
            res.maxDrawdown = user_robots[0].stats?.maxDrawdown || null;
            res.tradesCount = user_robots[0].stats?.tradesCount || null;
            res.profit = user_robots[0].stats?.profit || 0;
        }

        return res;
    });
