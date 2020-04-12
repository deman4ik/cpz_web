import React, { memo } from 'react';

import { useClearNotifications } from '../../../hooks/useClearNotifications';
import { CaptionButton } from '../../basic';
import styles from '../../../config/common.module.css';

const _ToolbarNotificationsPage: React.FC = () => {
  const { updateNotifications } = useClearNotifications();

  return (
    <div className={styles.toolbar}>
      <CaptionButton
        title='Mark All as Readed'
        icon='check'
        onClick={updateNotifications} />
    </div>
  );
};

export const ToolbarNotificationsPage = memo(_ToolbarNotificationsPage);
