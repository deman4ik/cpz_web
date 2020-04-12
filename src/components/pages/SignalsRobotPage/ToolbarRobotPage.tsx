import React, { memo } from 'react';

import { Button, CaptionButton } from '../../basic';
import { createVariable } from './helpers';
import styles from '../../../config/common.module.css';

interface Props {
  robotData: any;
  robotSubscribe: (variables: any) => void;
}

const _ToolbarRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => {
  const { isUserSignals } = robotData.robot;
  const handleOnPressAction = (action: string) => {
    robotSubscribe(createVariable(robotData, action));
  };

  return (
    <div className={styles.toolbar}>
      {isUserSignals ? (
        <CaptionButton
          title='Edit'
          icon='settings'
          responsive
          onClick={() => handleOnPressAction('edit')} />
      ) : (
        <Button
          type='primary'
          title='Follow'
          icon='plus'
          isUppercase
          responsive
          onClick={() => handleOnPressAction('subscribe')} />
      )}
    </div>
  );
};

export const ToolbarRobotPage = memo(_ToolbarRobotPage);
