import React, { memo } from 'react';

import { HeaderButtonRobotPage } from './HeaderButtonRobotPage';
import { HeaderStatsRobotPage } from './HeaderStatsRobotPage';
import { capitalize } from '../../../../config/utils';
import styles from './index.module.css';

interface Props {
  robotData: any;
  robotSubscribe: (variables: any) => void;
}

const _HeaderRobotsRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => (
  <div className={styles.header}>
      <div className={styles.container}>
          <div className={styles.headerName}>
              <div className={styles.robotNameWrapper}>
                  <div className={styles.robotName}>{robotData.robot.name}</div>
                </div>
              <HeaderButtonRobotPage robotSubscribe={robotSubscribe} robotData={robotData} />
            </div>
          <div className={styles.headerMessage}>
              {capitalize(robotData.user_robots ? robotData.user_robots.message : null)}
            </div>
        </div>
      <HeaderStatsRobotPage robotData={robotData} />
    </div>
);

export const HeaderRobotsRobotPage = memo(_HeaderRobotsRobotPage);
