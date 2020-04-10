import React, { memo } from 'react';

import { HeaderTradingTabRobotPage } from './HeaderTradingTabRobotPage';
import { ClosedPositionsRobotPageItem } from './ClosedPositionsRobotPageItem';
// import { ClosedPositionsRobotPageItemCard } from './ClosedPositionsRobotPageItemCard';
import { useShowDimension } from '../../../../hooks/useShowDimension';
import { SCREEN_TYPE } from '../../../../config/constants';
import { Robot } from '../types';
import styles from './ClosedPositionContainer.module.css';
import { RobotsLoadMore } from '../../../ui/RobotsLoadMore';
import { NoRecentData } from '../../../common';

interface Props {
  robot: Robot;
  handleLoadMore: () => void;
  data: any;
  quantyRecords: number;
  width: number;
  tableName: string;
  isLoadingMore: boolean;
}

const _ClosedPositionContainer: React.FC<Props> =
({ robot, handleLoadMore, isLoadingMore, quantyRecords, width, data, tableName }) => {
  const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
  return (
    <>
      <div className={styles.accordionTitle}>
        Closed Positions
      </div>
      {data && data[tableName].length ? (
        <div className={styles.accordionSurface}>
          {isDesktopView ? (
            <>
              <HeaderTradingTabRobotPage />
              { data[tableName].map(item => (
                <ClosedPositionsRobotPageItem key={item.id} item={item} robot={robot} />
              )) }
            </>
          ) : (
            <div className={styles.mobileCardContainer}>
              { data[tableName].map(item => (<div key={item.id} />
                // <ClosedPositionsRobotPageItemCard
                //   key={item.id}
                //   item={item}
                //   robot={robot}
                //   activeTab={SectionType.closedPositions} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <NoRecentData message='No Closed Positions' />
        </div>
      )}
      <RobotsLoadMore
        renderLoadMoreButton={data.length < quantyRecords}
        isLoadingMore={isLoadingMore}
        onFetchMore={handleLoadMore} />
    </>
  );
};

export const ClosedPositionContainer = memo(_ClosedPositionContainer);
