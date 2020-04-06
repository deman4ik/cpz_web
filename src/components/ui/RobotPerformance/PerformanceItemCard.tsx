/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import dynamic from 'next/dynamic';

import { Button } from '../../basic';
import { moneyFormat, colorAction } from '../../../config/utils';
import styles from './PerformanceItemCard.module.css';

interface Props {
  item: any;
  onRedirectToDetailView: (path: string) => void;
}

const DinamicAreaChart = dynamic(
  () => import('../../charts/AreaChart')
);

export const PerformanceItemCard: React.FC<Props> = ({ item, onRedirectToDetailView }) => {
  const handleOnPress = () => {
    onRedirectToDetailView(item.path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerCard}>
        <div className={styles.row} onClick={handleOnPress}>
          <div className={styles.col}>
            <div className={styles.statValue} style={{ marginBottom: 5 }}>{item.name}</div>
            { item.profit ? (
              <div className={styles.primaryText} style={colorAction(item.profit > 0)}>
                {`${item.profit > 0 ? '+' : ''}${moneyFormat(item.profit)} $`}
              </div>
            ) : null}
          </div>
          <div className={styles.col}>
            <Button
              title='details'
              isUppercase
              size='small'
              icon='chevronright' />
          </div>
        </div>
      </div>
      <div className={styles.chartStat}>
        <div className={styles.chartCol}>
          { (item.changes && item.changes.length) ? (
            <DinamicAreaChart
              height={120}
              positive={item.profit > 0}
              data={item.changes} />
          ) : <div className={styles.emptyChart} /> }
        </div>
        <div className={styles.statCol}>
          { (item.winRate || item.winRate === 0) ? (
            <>
              <div className={styles.statRow}>
                <div className={styles.label}>
                  Win Rate
                </div>
                <div className={styles.statValue}>
                  {item.winRate} %
                </div>
              </div>
              <div className={styles.statRow}>
                <div className={styles.label}>
                  Max Drawdown
                </div>
                <div className={styles.primaryText} style={colorAction(item.maxDrawdown > 0)}>
                  {`${moneyFormat(item.maxDrawdown)} $`}
                </div>
              </div>
              <div className={styles.statRow}>
                <div className={styles.label}>
                  Trades Count
                </div>
                <div className={styles.statValue}>
                  {item.tradesCount}
                </div>
              </div>
            </>
          ) : null }
        </div>
      </div>
    </div>
  );
};
