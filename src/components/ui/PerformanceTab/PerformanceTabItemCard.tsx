import React from 'react';
import styles from './PerformanceTabItemCard.module.css';

interface Props {
  item: any;
}

export const PerformanceTabItemCard: React.FC<Props> = ({ item }) => (
  <div className={styles.container}>
    <div className={styles.tableTitle}>
      <div className={styles.tableTitleText}>
        {item.title}
      </div>
    </div>
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardText}>
        <div className={styles.mobileCardTextKey}>
          All Trades
        </div>
        <div className={styles.mobileCardTextValue}>{item.all}</div>
      </div>
      <div className={styles.mobileCardText}>
        <div className={styles.mobileCardTextKey}>
          Long Trades
        </div>
        <div className={styles.mobileCardTextValue}>{item.long}</div>
      </div>
      <div className={styles.mobileCardText}>
        <div className={styles.mobileCardTextKey}>
          Short Trades
        </div>
        <div className={styles.mobileCardTextValue}>{item.short}</div>
      </div>
    </div>
  </div>
);
