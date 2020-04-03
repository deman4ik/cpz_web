import React, { memo } from 'react';

import { moneyFormat } from '../../../../config/utils';
import { subscribeAt, activeDays, getProfit, getVolume } from '../helpers';
import styles from './HeaderStatsRobotPage.module.css';

interface Props {
  robotData: any;
}

const _HeaderStatsRobotPage: React.FC<Props> = ({ robotData }) => {
  const { isUserSignals } = robotData.robot;
  return (
    <div className={styles.robotStats}>
      <div className={styles.robotStatsCol}>
        <div className={styles.robotStatsRow}>
          <div className={styles.robotStatsLabel}>
            Profit&nbsp;
          </div>
          <div className={[
            styles.robotStatsValue,
            getProfit(robotData, isUserSignals) > 0 ? 'positive' : 'negative'
          ].join(' ')}>
            {`${moneyFormat(getProfit(robotData, isUserSignals))} $`}
          </div>
        </div>
        <div className={styles.robotStatsRow}>
          <div className={styles.robotStatsLabel}>
            Volume&nbsp;
          </div>
          <div className={styles.robotStatsValue}>
            {getVolume(robotData)} {robotData.robot.asset}
          </div>
        </div>
      </div>
      <div className={styles.robotStatsCol}>
        <div className={styles.robotStatsRow}>
          <div className={styles.robotStatsLabel}>
            Active&nbsp;
          </div>
          <div className={styles.robotStatsValue}>
            {activeDays(robotData)}
          </div>
        </div>
        {isUserSignals && (
        <div className={styles.robotStatsRow}>
          <div className={styles.robotStatsLabel}>
            Subscribed&nbsp;
          </div>
          <div className={styles.robotStatsValue}>
            {subscribeAt(robotData)}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export const HeaderStatsRobotPage = memo(_HeaderStatsRobotPage);
