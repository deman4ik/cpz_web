/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER_AGGR_STATS_ALL } from '../../../graphql/signals/queries';
import { POLL_INTERVAL } from '../../../config/constants';
import { PerformanceEmpty } from './PerformanceEmpty';
import { PerformanceComponent } from './PerformanceComponent';
import { getFormatData, queryParam, title } from './helpers';
import styles from './index.module.css';
import { displayType } from './types';

interface Props {
  width: number;
  type: displayType;
}

const _RobotPerformance: React.FC<Props> = ({ width, type }) => {
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
    <div className={styles.container}>
      <div className={styles.regionTitle}>{title[type]}</div>
      { !formatData.length ? <PerformanceEmpty width={width} displayType={type} /> :
      <PerformanceComponent width={width} formatData={formatData} displayType={type} /> }
    </div>
  );
};

export const RobotPerformance = memo(_RobotPerformance);
