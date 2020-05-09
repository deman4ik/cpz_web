import React from 'react';

import { formatDate, valueWithSign, colorAction, moneyFormat, splitCapitaize } from '../../../../config/utils';
import { VolumePositionRobotPageItem } from './VolumePositionRobotPageItem';
import { Robot, SectionType } from '../types';
import styles from './ClosedPositionsRobotPageItemCard.module.css';

interface Props {
  item: any;
  robot: Robot;
  activeTab: SectionType;
}

export const ClosedPositionsRobotPageItemCard: React.FC<Props> = ({ item, robot, activeTab }) => {
  const { asset, isUserRobot } = robot;
  return (
    <div className={styles.posCard}>
      <div className={styles.rowCard}>
        <div className={styles.posCardCol} style={{ flex: 1 }}>
          <div className={styles.mobileCardTextKey}>Position</div>
          <div className={styles.mobileCardTextValue}>
            <div style={colorAction([ 'long', 'closeShort' ].includes(item.direction || item.action))}>
              {splitCapitaize(item.direction || item.action)}
            </div>
            {'\n'}
            <div className={styles.mobileCardTextKey}>{item.code}</div>
          </div>
        </div>
        <div className={styles.posCardCol} style={{ flex: 0.6 }}>
          <div className={styles.mobileCardTextKey}>Amount</div>
          <VolumePositionRobotPageItem
            activeTab={activeTab}
            direction={item.direction}
            volume={
                            activeTab === SectionType.openPositions && isUserRobot ? item.entry_executed : item.volume
                        }
            asset={asset}
                    />
        </div>
      </div>
      <div className={styles.rowCard} style={{ justifyContent: 'space-between' }}>
        <div className={styles.mobileCardRow} style={{ flex: 1 }}>
          <div className={styles.mobileCardTextKey}>
            {activeTab === SectionType.signals ? 'Price' : 'Entry'}
          </div>
          <div className={styles.mobileCardPrice}>{moneyFormat(item.entry_price || item.price)} $</div>
          <div className={styles.mobileCardDate}>{item.entry_date ? formatDate(item.entry_date) : ''}</div>
        </div>
        {activeTab === SectionType.closedPositions && (
        <div className={styles.mobileCardRow}>
          <div className={styles.mobileCardTextKey}>Exit</div>
          <div className={styles.mobileCardPrice}>{moneyFormat(item.exit_price)} $</div>
          <div className={styles.mobileCardDate}>{item.exit_date ? formatDate(item.exit_date) : ''}</div>
        </div>
        )}
      </div>
      {activeTab === SectionType.closedPositions && (
        <div className={styles.posCardFooter}>
          <div className={styles.posCardCol}>
            <div className={styles.mobileCardTextKey}>
              Bars Held&nbsp;&nbsp;
              <div className={styles.mobileCardTextValue}>{item.bars_held}</div>
            </div>
          </div>
          <div className={styles.posCardCol}>
            <div className={styles.mobileCardTextKey}>
              Profit&nbsp;&nbsp;
              <span className={styles.mobileCardTextValue} style={colorAction(item.profit > 0)}>
                {valueWithSign(moneyFormat(item.profit))} $
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
