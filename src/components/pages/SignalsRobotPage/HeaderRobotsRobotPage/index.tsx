import React, { memo } from 'react';

import { HeaderButtonRobotPage } from './HeaderButtonRobotPage';
import { HeaderStatsRobotPage } from './HeaderStatsRobotPage';
import { Tooltip } from '../../../ui/Tooltip';
// import { TooltipButton } from '../../ui/Tooltip/TooltipButton';
// import { TooltipText } from '../../ui/Tooltip/TooltipText';
// import { styles, responsive } from './HeaderRobotsRobotPage.style';
import styles from './index.module.css';

interface Props {
  robotData: any;
  robotSubscribe: (variables: any) => void;
}

const _HeaderRobotsRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => (
  <>
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerName}>
          <div className={styles.robotNameWrapper}>
            <div className={styles.robotName}>
              {robotData.robot.name}
            </div>
            <div className={styles.toolTip}>
              <Tooltip message={robotData.robot.strategyByStrategy.description} direction='down' />
            </div>
          </div>
          <HeaderButtonRobotPage
            robotSubscribe={robotSubscribe}
            robotData={robotData} />
        </div>
      </div>
      <HeaderStatsRobotPage robotData={robotData} />
    </div>
  </>
);

export const HeaderRobotsRobotPage = memo(_HeaderRobotsRobotPage);
