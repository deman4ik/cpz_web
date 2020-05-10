import React, { memo } from 'react';

import styles from './PerformanceHeader.module.css';

const _PerformanceHeader: React.FC = () => (
  <div className={styles.headerContainer}>
      <div className={[ styles.titleName, styles.titleFont ].join(' ')}>Name</div>
      <div className={[ styles.titlePerformance, styles.titleFont ].join(' ')}>Performance</div>
      <div className={[ styles.titleStatistics, styles.titleFont ].join(' ')}>Statistics</div>
    </div>
);

export const PerformanceHeader = memo(_PerformanceHeader);
