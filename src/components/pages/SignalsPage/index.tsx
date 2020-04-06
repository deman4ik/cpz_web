import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType } from '../../../config/types';
import { RobotPerformance } from '../../ui/RobotPerformance';
import { RobotOpenPositions } from '../../ui/RobotOpenPositions';
import { SignalRobots } from '../../ui/SignalsRobots';
import styles from './index.module.css';

export const SignalsPage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.signals}
      title='Signals'
      subTitle='Manual Trading'
      width={width}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <RobotPerformance
            width={width}
            type='signals' />
        </div>
        <div className={styles.wrapper}>
          <RobotOpenPositions
            width={width}
            type='signals' />
        </div>
      </div>
      <SignalRobots width={width} displayType='signals' />
    </Template>
  );
};
