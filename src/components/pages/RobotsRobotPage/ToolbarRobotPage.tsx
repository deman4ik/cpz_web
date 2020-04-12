import React, { memo } from 'react';

import { Button, CaptionButton } from '../../basic';
import { createVariable } from './helpers';
import styles from '../../../config/common.module.css';

interface Props {
  robotData: any;
  robotSubscribe: (variables: any) => void;
}

const _ToolbarRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => {
  const handleOnPressAction = (action: string) => {
    robotSubscribe(createVariable(robotData, action));
  };

  return (
    <div className={styles.toolbar}>
      {!robotData || !robotData.user_robots ? (
        <Button
          icon='plus'
          title='Add'
          type='primary'
          isUppercase
          responsive
          onClick={() => handleOnPressAction('create')} />
      ) : (
        <>
          {(robotData.user_robots && robotData.user_robots.status === 'stopped') ? (
            <>
              <CaptionButton
                title='edit'
                icon='settings'
                responsive
                onClick={() => handleOnPressAction('edit')} />
              <CaptionButton
                title='delete'
                icon='close'
                responsive
                onClick={() => handleOnPressAction('delete')} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export const ToolbarRobotPage = memo(_ToolbarRobotPage);
