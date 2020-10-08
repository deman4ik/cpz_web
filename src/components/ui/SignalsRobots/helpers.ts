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
        if (user_signals.length && user_signals[0].equity) {
            const { winRate, maxDrawdown, tradesCount, changes, profit } = user_signals[0].equity;
            res.performance = changes || [];
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
            equity,
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
            performance: equity ? equity.changes || [] : [],
            profit: equity ? equity.profit : 0,
            name,
            winRate: equity ? equity.winRate : null,
            maxDrawdown: equity ? equity.maxDrawdown : null,
            tradesCount: equity ? equity.tradesCount : null,
            isSubscribed: false,
            code
        };
    });

export const title = {
    signals: "My Signals Robots",
    robots: "My Robots"
};
