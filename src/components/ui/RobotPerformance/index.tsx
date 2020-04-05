import React, { memo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER_AGGR_STATS_ALL } from '../../../graphql/signals/queries';
import { POLL_INTERVAL } from '../../../config/constants';
import { PerformanceEmpty } from './PerformanceEmpty';
import { PerformanceComponent } from './PerformanceComponent';
import { getFormatData, queryParam } from './helpers';
import { styles } from './index.style';
import { displayType } from './types';

interface Props {
  screenWidth: number;
  width: number;
  title: string;
  type: displayType;
}

const _RobotPerformance: React.FC<Props> = ({ title, screenWidth, width, type }) => {
  const [ formatData, setFormatData ] = useState([]);
  const { data, loading } = useQuery(GET_USER_AGGR_STATS_ALL, {
    variables: { type: { _eq: queryParam[type] } },
    pollInterval: POLL_INTERVAL,
  });

  useEffect(() => {
    if (!loading && data) {
      setFormatData(getFormatData(data.stats, type));
    }
  }, [ loading, data ]);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={styles.regionTitle}>{title}</div>
      { !formatData.length ? <PerformanceEmpty screenWidth={screenWidth} width={width} displayType={type} /> :
      <PerformanceComponent screenWidth={screenWidth} width={width} formatData={formatData} displayType={type} /> }
    </div>
  );
};

export const RobotPerformance = memo(_RobotPerformance);
