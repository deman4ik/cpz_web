import React, { memo } from 'react';

import { HeaderTradingTabRobotPage } from './HeaderTradingTabRobotPage';
import { ClosedPositionsRobotPageItem } from './ClosedPositionsRobotPageItem';
// import { ClosedPositionsRobotPageItemCard } from './ClosedPositionsRobotPageItemCard';
import { SectionType } from '../types';
// import { common } from '../../../../styles';
import styles from './ClosedPositionContainer.module.css';
// import { Button } from '../../../basic';
import { NoRecentData } from '../../../common';

interface Props {
  robot: any;
  handleLoadMore: () => void;
  data: any;
  quantyRecords: number;
  isLoadingMore: boolean;
}

const _ClosedPositionContainer: React.FC<Props> =
({ robot, handleLoadMore, isLoadingMore, quantyRecords, data }) => (
  <>
    <div className={styles.accordionTitle}>
      Closed Positions
    </div>
    <div className={styles.accordionSurface}>
      {data.length ? (
        <>
          {/* {maxTablet ? (
            <View style={common.mobileCardContainer}>
              { data.map(item => (
                <ClosedPositionsRobotPageItemCard
                  key={item.id}
                  item={item}
                  robot={robot}
                  activeTab={SectionType.closedPositions} />
              ))}
            </View>
          ) : ( */}
            <>
              <HeaderTradingTabRobotPage />
              { data.map(item => (
                <ClosedPositionsRobotPageItem key={item.id} item={item} robot={robot} />
              )) }
            </>
          {/* )} */}
          { (data.length < quantyRecords) && (
            <div />
            // <View style={styles.loadMore}>
            //   <Button
            //     width={146}
            //     title={t('Load More')}
            //     type='dimmed'
            //     icon='arrow-down'
            //     isUppercase
            //     isLoading={isLoadingMore}
            //     onPress={handleLoadMore} />
            // </View>
          )}
        </>
      ) : (
        <NoRecentData message='No Closed Positions' />
      )}
    </div>
  </>
);

export const ClosedPositionContainer = memo(_ClosedPositionContainer);
