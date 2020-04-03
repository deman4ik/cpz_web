import React, { useState, useEffect, memo } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

import { LightWeightChart } from '../../../charts/LightWeightChart';
import { ChartType } from '../../../charts/LightWeightChart/types';
import { ROBOT_POSITION_WITH_CANDLE } from '../../../../graphql/robots/queries';
import { ROBOT_POSITION_WITH_CANDLE_SUB } from '../../../../graphql/robots/subscribtions';
import { SET_CHART_DATA } from '../../../../graphql/local/mutations';
import { getFormatData, getFormatUpdateData } from '../helpers';
import { getLegend } from '../../../../services/Utils';

interface Props {
  robot: any;
  signals: any;
  screenWidth: number;
  isMobile: boolean;
}
const LIMIT = 120;
const _CandleChart: React.FC<Props> = ({ robot, signals, screenWidth, isMobile }) => {
  const candleName = `candles${robot.timeframe}`;
  const legend = getLegend(robot);
  const { asset } = robot;
  const [ limit, setLimit ] = useState(LIMIT);
  const [ formatData, setFormatData ] = useState({ candles: [], markers: [] });

  const { loading, data, fetchMore } = useQuery(ROBOT_POSITION_WITH_CANDLE(robot.timeframe), {
    variables: {
      robotId: robot.id,
      limit
    },
    notifyOnNetworkStatusChange: true
  });

  const { data: dataUpdate } = useSubscription(ROBOT_POSITION_WITH_CANDLE_SUB(robot.timeframe), {
    variables: {
      robotId: robot.id,
    },
  });

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

  useEffect(() => {
    if (!loading && data) {
      setFormatData(getFormatData(data, asset));
    }
  }, [ loading, data ]);

  useEffect(() => {
    if (data && dataUpdate && dataUpdate.candles.length) {
      const updateCandle = getFormatUpdateData(dataUpdate, asset);
      if (updateCandle.candles.time && !formatData.candles.find(el => el.time === updateCandle.candles.time)) {
        setFormatData(prev => ({
          candles: [ ...prev.candles, updateCandle.candles ],
          markers: [ ...prev.markers, ...updateCandle.markers ] }));
        setLimit(limit + 1);
      }
    }
  }, [ dataUpdate ]);

  useEffect(() => {
    setChartData({ variables: { limit, robotId: robot.id, timeframe: robot.timeframe } });
  }, [ limit ]);

  return (
    <LightWeightChart
      loading={loading}
      data={formatData.candles}
      onFetchMore={onFetchMore}
      markers={formatData.markers}
      lines={signals}
      size={{ screenWidth, height: 400, isMobile }}
      legend={legend}
      type={ChartType.candle} />
  );
};

export const CandleChart = memo(_CandleChart);
