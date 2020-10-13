import dayjs from "libs/dayjs";

export const formatRobotsData = (v_robots_stats: any) =>
    v_robots_stats.map((el: any) => {
        console.log(el);
        const { id, code, name, exchange, asset, currency, started_at, user_signals, stats } = el.robots;
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
            volume:
                robot_settings.volumeType === "assetStatic"
                    ? `${robot_settings.volume || 0} ${asset}`
                    : `${robot_settings.volumeInCurrency || 0} ${currency}`,
            profit: stats && stats?.profit ? stats?.profit : 0,
            performance: stats?.equity || [],
            active: started_at ? dayjs.utc(started_at).fromNow(true) : started_at,
            subscribed: null,
            isSubscribed: false,
            winRate: stats && stats?.winRate ? stats?.winRate : null,
            maxDrawdown: stats && stats?.maxDrawdown ? stats?.maxDrawdown : null,
            tradesCount: stats && stats?.tradesCount ? stats?.tradesCount : null
        };

        if (user_signals?.length && user_signals[0]?.subscribed_at) {
            const userSignals = user_signals[0];
            res.subscribed = dayjs.utc(userSignals.subscribed_at).fromNow(true);
            res.isSubscribed = true;
            res.volume = `${userSignals.user_signal_settings.signal_settings.volume || 0} ${asset}`;
            res.profit = userSignals.stats && userSignals.stats?.profit ? userSignals.stats?.profit : 0;
            res.winRate = userSignals.stats ? userSignals.stats?.winRate : 0;
            res.maxDrawdown = userSignals.stats ? userSignals.stats?.maxDrawdown : 0;
            res.tradesCount = userSignals.stats ? userSignals.stats?.tradesCount : 0;
            res.performance = userSignals.stats && userSignals.stats?.equity ? userSignals.stats?.equity : [];
        }
        return res;
    });
