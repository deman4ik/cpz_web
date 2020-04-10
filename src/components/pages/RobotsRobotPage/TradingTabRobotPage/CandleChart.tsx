import React, { useMemo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import dynamic from 'next/dynamic';

import { ChartType } from '../../../charts/LightWeightChart/types';
import { LoadingIndicator } from '../../../common';
import { ROBOT_POSITION_WITH_CANDLE, USER_ROBOTS_POSITION_WITH_CANDLE } from '../../../../graphql/robots/queries';
import { SET_CHART_DATA } from '../../../../graphql/local/mutations';
import { POLL_INTERVAL } from '../../../../config/constants';
import { getFormatData } from '../helpers';
import { getLegend } from '../../../../config/utils';

interface Props {
  robot: any;
  userRobots: any;
  width: number;
}
const LIMIT = 120;

const LightWeightChartWithNoSSR = dynamic(
  () => import('../../../charts/LightWeightChart'),
  { loading: () => <LoadingIndicator />,
    ssr: false }
);

export const CandleChart: React.FC<Props> = ({ robot, width, userRobots }) => {
  const candleName = `candles${robot.timeframe}`;
  const legend = getLegend(robot);
  const { asset } = robot;
  const [ limit, setLimit ] = useState(LIMIT);

  const { loading, data, fetchMore } = useQuery(
    userRobots ? USER_ROBOTS_POSITION_WITH_CANDLE(robot.timeframe) : ROBOT_POSITION_WITH_CANDLE(robot.timeframe), {
      variables: {
        robotId: userRobots ? userRobots.id : robot.id,
        limit
      },
      pollInterval: POLL_INTERVAL,
      notifyOnNetworkStatusChange: true
    }
  );

  const [ setChartData ] = useMutation(SET_CHART_DATA);
  const onFetchMore = () => {
    fetchMore({
      variables: {
        limit: limit + LIMIT
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setLimit(limit + LIMIT);
        let result = null;
        try {
          result = { ...{ [candleName]: [ ...fetchMoreResult[candleName] ] } };
        } catch (err) {
          result = prev;
        }
        return result;
      }
    });
  };

  const formatData = useMemo(() =>
    ((!loading && data)
      ? getFormatData(data, asset, !!userRobots)
      : { candles: [], markers: [] }), [ loading, data ]);

  useEffect(() => {
    setChartData({ variables: { limit, robotId: robot.id, timeframe: robot.timeframe } });
  }, [ limit ]);

  return (
    <LightWeightChartWithNoSSR
      loading={loading}
      data={formatData.candles}
      onFetchMore={onFetchMore}
      markers={formatData.markers}
      legend={legend}
      size={{ width, height: 400 }}
      type={ChartType.candle} />
  );
};