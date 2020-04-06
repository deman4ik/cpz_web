import React, { memo } from 'react';
import Router from 'next/router';

import { useShowDimension } from '../../../hooks/useShowDimension';
import { SCREEN_TYPE } from '../../../config/constants';
import { PerformanceItem } from './PerformanceItem';
import { PerformanceItemCard } from './PerformanceItemCard';
import { PerformanceHeader } from './PerformanceHeader';
import { useDummyCarts } from '../../../hooks/useDummyCarts';
import { DummyCards } from '../../common';
import styles from './PerformanceComponent.module.css';

interface Props {
  formatData: any;
  width: number;
  displayType: string;
}

const cardWidth = 410;
const _PerformanceComponent: React.FC<Props> = ({ width, formatData, displayType }) => {
  const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
  const { dummyCards } = useDummyCarts(width, cardWidth, formatData.length);

  const handleRedirectToDetailView = (path: string) => {
    Router.push(`/${displayType}/stats?${path}`);
  };

  return (
    <>
      { isDesktopView ? (
        <div className={styles.container}>
          <PerformanceHeader />
          { formatData.map(item => (
            <PerformanceItem
              key={item.id}
              item={item}
              onRedirectToDetailView={handleRedirectToDetailView} />
          )) }
        </div>
      ) : (
        <div className={styles.cardItemsContainer}>
          { formatData.map(item => (
            <PerformanceItemCard
              key={item.id}
              item={item}
              onRedirectToDetailView={handleRedirectToDetailView} />
          )) }
          {DummyCards(dummyCards, cardWidth)}
        </div>
      )}
    </>
  );
};

export const PerformanceComponent = memo(_PerformanceComponent);