import React, { memo } from 'react';

import { formatDate } from '../../../config/utils';
import { showMessage, getRedirectionLink } from './helpers';
import styles from './NotificationsItemCard.module.css';

interface Props {
  item: any;
  routeNotification: (action: { link: string; redirect: boolean }) => void;
}

export const _NotificationsItemCard: React.FC<Props> = ({ item, routeNotification }) => {
  const handleOnPressNotification = () => {
    routeNotification(getRedirectionLink(item));
  };

  return (
    <div className={styles.card}>
      <div className={styles.dateGroup}>
        <div className={styles.dateText}>
          {formatDate(item.timestamp)}
        </div>
        { !item.readed ? <div className={styles.mark}>&nbsp;*</div> : null }
      </div>
      { showMessage(item, handleOnPressNotification, true) }
    </div>
  );
};

export const NotificationsItemCard = memo(_NotificationsItemCard);
