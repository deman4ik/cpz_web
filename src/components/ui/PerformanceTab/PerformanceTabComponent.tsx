import React, { memo } from 'react';

import { useShowDimension } from '../../../hooks/useShowDimension';
import { SCREEN_TYPE } from '../../../config/constants';
import { NoRecentData } from '../../common';
import { PerformanceTabItem } from './PerformanceTabItem';
//import { PerformanceTabItemCard } from './PerformanceTabItemCard';
import { PerformanceTabStatisticts } from './PerformanceTabStatisticts';
import { capitalize } from '../../../config/utils';
import styles from './PerformanceTabComponent.module.css';

interface Props {
  robotStatistic: any;
  width: number;
}

const _PerformanceTabComponent: React.FC<Props> = ({ robotStatistic, width }) => {
  const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
  return (
    <div className={styles.accordionSurface}>
      {isDesktopView && <PerformanceTabStatisticts />}
      {!robotStatistic ? (
        <NoRecentData message='No recent data available' />
      ) : (
        <>
          {Object.keys(robotStatistic).map(subtitle => (
            <div key={subtitle}>
              {isDesktopView ? (
                <>
                  <div className={styles.tableTitle}>
                    <div className={styles.tableTitleText}>
                      {capitalize(subtitle)}
                    </div>
                  </div>
                  { robotStatistic[subtitle].map((item, idx) => (
                    <PerformanceTabItem key={idx} item={item} />
                  )) }
                </>
              ) : (
                <>
                  {/* { robotStatistic[subtitle].map((item, idx) => (
                  <PerformanceTabItemCard key={idx} item={item} />
                )) } */}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export const PerformanceTabComponent = memo(_PerformanceTabComponent);
