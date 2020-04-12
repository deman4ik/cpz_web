/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react';
import Router from 'next/router';

import { CaptionButton } from '../../basic';
import styles from './SignalRobotsAddSignals.module.css';

interface Props {
  displayType: string;
}

const _SignalRobotsAddSignalsCard: React.FC<Props> = ({ displayType }) => {
  const handleOnPress = () => {
    Router.push(`/${displayType}/search`);
  };

  return (
    <div className={styles.itemContainerCard}>
      <div
        className={styles.border}
        onClick={handleOnPress}
      >
        <CaptionButton
          title={`Add ${displayType}`}
          icon='plus'
          responsive={false} />
      </div>
    </div>
  );
};

export const SignalRobotsAddSignalsCard = memo(_SignalRobotsAddSignalsCard);
