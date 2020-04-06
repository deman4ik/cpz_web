import React, { memo } from 'react';

import { SectionType } from '../types';
import { ClosedPositionsRobotPageItemCard } from './ClosedPositionsRobotPageItemCard';
import styles from './OpenPositionContainer.module.css';

interface Props {
  robot: any;
  data: any;
  positionInfo: { title: string; empty: string; activeTab: SectionType };
}

const _OpenPositionContainer: React.FC<Props> = ({ data, robot, positionInfo }) => (
  <div className={styles.topCards}>
    <div className={styles.accordionTitle}>
      {positionInfo.title}
    </div>
    <div className={styles.topCardsContainer}>
      { data.length ? data.map((item, idx) => (
        <ClosedPositionsRobotPageItemCard
          key={idx}
          item={item}
          robot={robot}
          activeTab={positionInfo.activeTab} />
      )) : (
        <div className={styles.tableCellEmpty}>
          {positionInfo.empty}
        </div>
      )}
    </div>
  </div>
);

export const OpenPositionContainer = memo(_OpenPositionContainer);
