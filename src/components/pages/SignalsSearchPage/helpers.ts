import dayjs from '../../../libs/dayjs';

export const formatRobotsData = (v_robots_stats: any) =>
  v_robots_stats.map((el: any) => {
    const {
      id,
      code,
      name,
      exchange,
      asset,
      currency,
      started_at,
      user_signals,
      equity,
      robot_settings
    } = el.robots;

    const res = {
      cache: {
        id,
        tableName: 'robots'
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
      volume: robot_settings.volume,
      profit: equity && equity.profit ? equity.profit : 0,
      performance: equity && equity.changes ? equity.changes : [],
      active: started_at ? dayjs.utc(started_at).fromNow(true) : started_at,
      subscribed: null,
      isSubscribed: false,
      winRate: equity && equity.winRate ? equity.winRate : null,
      maxDrawdown: equity && equity.maxDrawdown ? equity.maxDrawdown : null,
      tradesCount: equity && equity.tradesCount ? equity.tradesCount : null
    };

    if (user_signals.length && user_signals[0].subscribed_at) {
      const userSignals = user_signals[0];
      res.subscribed = dayjs.utc(userSignals.subscribed_at).fromNow(true);
      res.isSubscribed = true;
      res.volume = userSignals.volume;
      res.profit =
        userSignals.equity && userSignals.equity.profit
          ? userSignals.equity.profit
          : 0;
      res.winRate = userSignals.equity ? userSignals.equity.winRate : 0;
      res.maxDrawdown = userSignals.equity ? userSignals.equity.maxDrawdown : 0;
      res.tradesCount = userSignals.equity ? userSignals.equity.tradesCount : 0;
      res.performance =
        userSignals.equity && userSignals.equity.changes
          ? userSignals.equity.changes
          : [];
    }
    return res;
  });
