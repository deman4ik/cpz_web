import React from 'react';

import { Button } from '../../basic';
import { displayData } from './helpers';
import styles from './RobotsButtonItemCard.module.css';

interface Props {
  isSubscribed: boolean;
  robotStatus: string;
  subscribeToggle: () => void;
  handleOnPressChangeVolume: () => void;
  handleOnPressDelete: () => void;
  displayType: string;
}

export const RobotsButtonItemCard: React.FC<Props> =
({ isSubscribed, subscribeToggle, handleOnPressChangeVolume, handleOnPressDelete, displayType, robotStatus }) => {
  const { title, icon, type } = displayData[displayType];
  const checker = displayType === 'signals' ? isSubscribed : robotStatus;
  const canDisplayEdit = () => ((displayType === 'signals' && isSubscribed) || (displayType === 'robots' && robotStatus === 'stopped'));
  const canDisplayDelete = () => ((displayType === 'robots' && robotStatus === 'stopped'));

  return (
    <div className={styles.btnRow}>
      { canDisplayDelete() && (
      <Button
        icon='close'
        size='small'
        width={26}
        onClick={handleOnPressDelete} />
      )}
      { canDisplayEdit() && (
      <Button
        icon='settings'
        size='small'
        width={26}
        onClick={handleOnPressChangeVolume} />
      )}
      <Button
        icon={icon(checker)}
        title={title(checker)}
        type={type(checker)}
        isUppercase
        disabled={displayType === 'robots' && robotStatus === 'stopping'}
        style={{ marginLeft: 2, marginRight: 8 }}
        size='small'
        onClick={subscribeToggle}
      />
    </div>
  );
};
