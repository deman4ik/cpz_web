import gql from 'graphql-tag';
import dayjs from '../../libs/dayjs';
import { USER_SIGNALS, GET_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_SIGNALS } from '../signals/queries';
import { ROBOT_POSITION_WITH_CANDLE } from '../robots/queries';

export const unsubscribe = (_root: any, variables: any, context: any) => {
  const isExistSignals = Object.keys(context.cache.data.data.ROOT_QUERY).find(
    (el) => el.indexOf('user_signals_robots') === 0
  );
  if (isExistSignals) {
    const dataSignals = context.cache.readQuery({ query: USER_SIGNALS });
    context.cache.writeQuery({
      query: USER_SIGNALS,
      data: {
        signals: dataSignals.signals.filter((el) => el.robot.id !== variables.cache.id)
      }
    });
  }
  if (variables.cache.tableName === 'robots' || variables.cache.tableName === 'charts') {
    const idRobots = context.getCacheKey({
      __typename: 'robots',
      id: variables.cache.id
    });
    context.cache.writeData({ id: idRobots, data: { user_signals: [] } });
    if (variables.cache.tableName === 'charts') {
      const { limit, robotId, timeframe } = variables.chartData;
      const dataCandles = context.cache.readQuery({
        query: ROBOT_POSITION_WITH_CANDLE(timeframe),
        variables: { limit, robotId }
      });
      const dataChart = dataCandles.candles.map((item) => ({
        ...item,
        robot: { ...item.robot, user_signals: [] }
      }));
      context.cache.writeQuery({
        query: ROBOT_POSITION_WITH_CANDLE(timeframe),
        variables: { limit, robotId },
        data: {
          candles: dataChart
        }
      });
    }
  }
};

export const subscribe = (_root: any, variables: any, context: any) => {
  if (variables.type === 'edit') {
    if (variables.cache.tableName === 'robots' || variables.cache.tableName === 'charts') {
      const idRobots = context.getCacheKey({
        __typename: 'robots',
        id: variables.cache.id
      });
      const fragmentRobots = gql`
                fragment changeRow on robots {
                    user_signals {
                        volume
                    }
                }
            `;
      const row = context.cache.readFragment({
        fragment: fragmentRobots,
        id: idRobots
      });
      const row_user_signals = row.user_signals.map((rowItem) => ({
        ...rowItem,
        volume: variables.volume
      }));
      const data = { ...row, user_signals: row_user_signals };
      context.cache.writeData({ id: idRobots, data });

      if (variables.cache.tableName === 'charts') {
        const { limit, robotId, timeframe } = variables.chartData;
        const dataCandles = context.cache.readQuery({
          query: ROBOT_POSITION_WITH_CANDLE(timeframe),
          variables: { limit, robotId }
        });
        const dataChart = dataCandles.candles.map((item) => {
          const user_signals = item.robot.user_signals.map((robotItem) => ({
            ...robotItem,
            volume: variables.volume
          }));
          return { ...item, robot: { ...item.robot, user_signals } };
        });
        context.cache.writeQuery({
          query: ROBOT_POSITION_WITH_CANDLE(timeframe),
          variables: { limit, robotId },
          data: {
            candles: dataChart
          }
        });
      }
    }
  } else {
    const isExistRobots = Object.keys(context.cache.data.data.ROOT_QUERY).find(
      (el) => el.indexOf('robots_info_user_signals') === 0
    );
    if (isExistRobots) {
      const idRobots = context.getCacheKey({
        __typename: 'robots',
        id: variables.cache.id
      });
      const fragmentRobots = gql`
                fragment subscribeRow on robots {
                    user_signals {
                        subscribed_at
                        volume
                        statistics
                        equity
                    }
                }
            `;
      const row = context.cache.readFragment({
        fragment: fragmentRobots,
        id: idRobots
      });
      const userItem = {
        volume: variables.volume,
        subscribed_at: dayjs(new Date()).toISOString(),
        equity: [],
        statistics: [],
        __typename: 'user_signals'
      };
      context.cache.writeFragment({
        fragment: fragmentRobots,
        id: idRobots,
        data: { ...row, user_signals: [ userItem ] }
      });
    }
    const isExistVRobotsStats = Object.keys(context.cache.data.data.ROOT_QUERY).find(
      (el) => el.indexOf('v_robots_stats_signals') === 0
    );
    const userSignalsItem = {
      volume: variables.volume,
      subscribed_at: dayjs(new Date()).toISOString(),
      equity: [],
      __typename: 'user_signals'
    };
    if (isExistVRobotsStats) {
      const dataRobots = context.cache.readQuery({
        query: GET_ROBOTS_BY_STATS_SIGNALS
      });
      const v_robots_stats = dataRobots.v_robots_stats.map((el) => {
        if (el.robots.id === variables.cache.id) {
          const robots = { ...el.robots, user_signals: [ userSignalsItem ] };
          return { ...el, robots };
        }
        return el;
      });
      context.cache.writeQuery({
        query: GET_ROBOTS_BY_STATS_SIGNALS,
        data: { v_robots_stats }
      });
    }
    if (variables.cache.tableName === 'charts') {
      const { limit, robotId, timeframe } = variables.chartData;
      const dataCandles = context.cache.readQuery({
        query: ROBOT_POSITION_WITH_CANDLE(timeframe),
        variables: { limit, robotId }
      });
      const dataChart = dataCandles.candles.map((item) => {
        const user_signals = [ ...item.robot.user_signals, userSignalsItem ];
        return { ...item, robot: { ...item.robot, user_signals } };
      });
      context.cache.writeQuery({
        query: ROBOT_POSITION_WITH_CANDLE(timeframe),
        variables: { limit, robotId },
        data: {
          candles: dataChart
        }
      });
    }

    const isExistSignals = Object.keys(context.cache.data.data.ROOT_QUERY).find(
      (el) => el.indexOf('user_signals_robots') === 0
    );
    if (isExistSignals) {
      const dataSignals = context.cache.readQuery({ query: USER_SIGNALS });
      const idRobots = context.getCacheKey({
        __typename: 'robots',
        id: variables.cache.id
      });
      const fragmentRobots = gql`
                fragment addRow on robots {
                    id
                    code
                    name
                    exchange
                    asset
                    currency
                    status
                    started_at
                    user_signals {
                        volume
                        subscribed_at
                        equity
                    }
                }
            `;
      const item = {
        robot: context.cache.readFragment({
          fragment: fragmentRobots,
          id: idRobots
        }),
        __typename: 'user_signals'
      };
      context.cache.writeQuery({
        query: USER_SIGNALS,
        data: {
          signals: [ ...dataSignals.signals, item ]
        }
      });
    }
  }
};
