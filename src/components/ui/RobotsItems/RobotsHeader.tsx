import React, { memo } from 'react';
import styles from './RobotsHeader.module.css';

const _RobotsHeader: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.titleName}>Robot Name</div>
    <div className={styles.titlePerformance}>Performance</div>
    <div className={styles.titleStatistics}>Statistics</div>
    <div className={styles.titleStatus}>Status</div>
    <div className={styles.titleAction}>Action</div>
  </div>
);

export const RobotsHeader = memo(_RobotsHeader);
