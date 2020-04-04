import React from 'react';

import { Button } from '../../basic';
import { displayData } from './helpers';
import styles from './RobotsItem.module.css';

interface Props {
  isSubscribed: boolean;
  robotStatus: string;
  subscribeToggle: () => void;
  handleOnPressChangeVolume: () => void;
  handleOnPressDelete: () => void;
  displayType: string;
}

export const RobotsButtonItem: React.FC<Props> =
({ isSubscribed, subscribeToggle, handleOnPressChangeVolume, handleOnPressDelete, displayType, robotStatus }) => {
  const { title, icon, type, hoverTitle, hoverIcon, hoverType } = displayData[displayType];
  const checker = displayType === 'signals' ? isSubscribed : robotStatus;
  const canDisplayHover = () => (
    (displayType === 'robots' && (robotStatus === 'started' || robotStatus === 'paused')) ||
    (displayType === 'signals' && isSubscribed)
  );
  const canDisplayEdit = () => ((displayType === 'signals' && isSubscribed) || (displayType === 'robots' && robotStatus === 'stopped'));
  const canDisplayDelete = () => ((displayType === 'robots' && robotStatus === 'stopped'));

  return (
    <div className={styles.cellAction}>
      <Button
        icon={icon(checker)}
        title={title(checker)}
        type={type(checker)}
        isUppercase
        width={120}
        size='small'
        disabled={displayType === 'robots' && robotStatus === 'stopping'}
        hoverChanges={canDisplayHover() ? {
          type: hoverType(robotStatus),
          title: hoverTitle(robotStatus),
          icon: hoverIcon(robotStatus)
        } : null}
        onPress={subscribeToggle}
      />
      { canDisplayEdit() && (
      <Button
        title='edit'
        icon='settings'
        size='small'
        type='dimmed'
        isUppercase
        width={120}
        style={{ marginTop: 6 }}
        onPress={handleOnPressChangeVolume} />
      )}
      { canDisplayDelete() && (
      <Button
        title='delete'
        icon='close'
        size='small'
        type='dimmed'
        isUppercase
        width={120}
        style={{ marginTop: 6 }}
        onPress={handleOnPressDelete} />
      )}
    </div>
  );
};
