/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, memo } from 'react';
import dynamic from 'next/dynamic';

import dayjs from '../../../libs/dayjs';
import { NoRecentData, LoadingIndicator } from '../../common';
import { TabType } from '../../../config/types';
import { ChartType } from '../../charts/LightWeightChart/types';
import { PerformanceTabComponent } from './PerformanceTabComponent';
import { tabName, getRobotStatistic } from './helpers';
import styles from './index.module.css';

interface Props {
  stat: any;
  activeTab: TabType;
  width: number;
}

const LightWeightChartWithNoSSR = dynamic(
  () => import('../../charts/LightWeightChart'),
  { loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false }
);

const _PerformanceTabRobotPage: React.FC<Props> = ({ stat, activeTab, width }) => {
  const [ isChartLoaded, setIsChartLoaded ] = useState(false);
  const chartData = useMemo(() => (
    (!stat.statistics || !stat.statistics.performance) ? null :
      stat.statistics.performance.map(pos => ({
        time: dayjs.utc(pos.x / 1000).valueOf(), value: pos.y
      }))
  ), [ stat ]);

  const robotStatistic = useMemo(() => (
    (!stat.statistics || !stat.statistics.performance) ? null :
      getRobotStatistic(stat.statistics)
  ), [ stat ]);

  return (
    <>
      {!stat ? <LoadingIndicator /> : (
        <>
          { !chartData
            ? (<NoRecentData message='No recent data available' style={{ marginTop: 20 }} />)
            : (<LightWeightChartWithNoSSR data={chartData} type={ChartType.area} size={{ height: 400, width }} setIsChartLoaded={setIsChartLoaded} />)}
          {isChartLoaded ? (
            <>
              <div className={styles.performanceTitle}>
                {tabName[TabType[activeTab]]}
              </div>
              <PerformanceTabComponent width={width} robotStatistic={robotStatistic} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export const PerformanceTabRobotPage = memo(_PerformanceTabRobotPage);
