import React from 'react';

import styles from './RobotsItem.module.css';

interface Props {
  item: any;
  displayType: string;
}

export const RobotItemStatusBlock: React.FC<Props> = ({ item, displayType }) => (
  <>
      {displayType === 'signals' && item.active ? (
      <div className={styles.statisticsElement}>
                <div className={styles.secondaryText}>Active&nbsp;</div>
              <div className={styles.statisticsText}>{item.active}</div>
            </div>
        ) : null}
      {displayType === 'robots' &&
        ((item.active && !item.user_robots.status) || item.user_robots.status === 'started') ? (
          <div className={styles.statisticsElement}>
              <div className={styles.secondaryText}>
              {`${item.user_robots.status === 'started' ? 'Started' : 'Active'}`}&nbsp;
            </div>
                <div className={styles.statisticsText}>
              {item.user_robots.status === 'started' ? item.started_at : item.active}
            </div>
            </div>
      ) : null}
      {item.isSubscribed ? (
          <div className={styles.statisticsElement} style={{ marginTop: 8 }}>
                <div className={styles.secondaryText}>Subscribed&nbsp;</div>
                <div className={styles.statisticsText}>{item.subscribed}</div>
            </div>
        ) : null}
    </>
);
