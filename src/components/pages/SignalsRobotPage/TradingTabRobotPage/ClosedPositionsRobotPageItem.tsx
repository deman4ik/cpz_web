import React from 'react';

import { formatDate, capitalize, valueWithSign, moneyFormat, colorDirection } from '../../../../config/utils';
import styles from './ClosedPositionsRobotPageItem.module.css';
import { color } from '../../../../config/constants';

interface Props {
  item: any;
  robot: any;
}

export const ClosedPositionsRobotPageItem: React.FC<Props> = ({ item, robot }) => {
  const { asset } = robot;
  return (
    <div className={styles.tableRow}>
      <div className={styles.col} style={{ flex: 0.5 }}>
        <div className={styles.tableCellText}>
          <div style={colorDirection(item.direction)}>
            {capitalize(item.direction)}
          </div>
          {'\n'}
          <div className={styles.title}>
            {item.code}
          </div>
        </div>
      </div>
      <div className={styles.col} style={{ flex: 0.5, justifyContent: 'center' }}>
        <div className={styles.tableCellText}>
          {item.volume} {asset}
        </div>
      </div>
      <div className={styles.col} style={{ flex: 1 }}>
        <div className={styles.tableCellText}>
          {moneyFormat(item.entry_price)} $
          {'\n'}
          <div className={styles.title}>
            {formatDate(item.entry_date)}
          </div>
        </div>
      </div>
      <div className={styles.col} style={{ flex: 1 }}>
        <div className={styles.tableCellText}>
          {moneyFormat(item.exit_price)} $
          {'\n'}
          <div className={styles.title}>
            {formatDate(item.exit_date)}
          </div>
        </div>
      </div>
      <div className={styles.col} style={{ flex: 0.5, justifyContent: 'center' }}>
        <div className={styles.tableCellText}>
          {item.bars_held}
        </div>
      </div>
      <div className={styles.col} style={{ flex: 0.5, justifyContent: 'center' }}>
        <div className={styles.tableCellText} style={{ color: item.profit > 0 ? color.positive : color.negative }}>
          {valueWithSign(moneyFormat(item.profit))} $
        </div>
      </div>
    </div>
  );
};
