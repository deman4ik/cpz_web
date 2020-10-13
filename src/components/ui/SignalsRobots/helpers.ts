import dayjs from "../../../libs/dayjs";

// TODO: use formatSignalData to form the array
export const getFormatDataSignals = (signals: any) => {
    return signals.map(({ robot }: any) => {
        const { id, name, asset, currency, exchange, started_at, code, user_signals } = robot;
        const {
            user_signal_settings: { signal_settings }
        } = user_signals[0];
        const res = {
            cache: {
                id,
                tableName: "robots"
            },
            id,
            asset,
            currency,
            exchange,
            volume:
                signal_settings.volumeType === "currencyDynamic"
                    ? `${signal_settings.volumeInCurrency} ${currency}`
                    : `${signal_settings.volume} ${asset}`,
            user_robots: {
                status: null,
                id: null
            },
            subscribed: dayjs.utc(user_signals[0]?.subscribed_at)?.fromNow(true),
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
        if (user_signals.length && user_signals[0].stats) {
            const { equity, profit, winRate, maxDrawdown, tradesCount } = user_signals[0].stats;
            res.performance = equity || [];
            res.profit = profit || 0;
            res.winRate = winRate || 0;
            res.maxDrawdown = maxDrawdown || 0;
            res.tradesCount = tradesCount || 0;
        }
        return res;
    });
};

export const getFormatDataRobots = (robots: any) =>
    robots.map((userRobot: any) => {
        const {
            id,
            status,
            started_at,
            robot,
            robot_id,
            stats,
            user_robot_settings: { user_robot_settings }
        } = userRobot;

        const { name, asset, currency, exchange, active, code } = robot;
        return {
            cache: {
                id,
                tableName: "user_robots"
            },
            id: robot_id,
            asset,
            currency,
            exchange,
            volume: `${user_robot_settings.volume} ${asset}`,
            user_robots: {
                status,
                id
            },
            active: active ? dayjs.utc(active).fromNow(true) : active,
            started_at: started_at ? dayjs.utc(started_at).fromNow(true) : 0,
            performance: stats?.equity || [],
            profit: stats?.profit || 0,
            name,
            winRate: stats?.winRate || null,
            maxDrawdown: stats?.maxDrawdown || null,
            tradesCount: stats?.tradesCount || null,
            isSubscribed: false,
            code
        };
    });

export const title = {
    signals: "My Signals Robots",
    robots: "My Robots"
};
