import React, { memo } from 'react';
import Router from 'next/router';

import { useShowDimension } from '../../../hooks/useShowDimension';
import { SCREEN_TYPE } from '../../../config/constants';
import { PerformanceItem } from './PerformanceItem';
import { PerformanceItemCard } from './PerformanceItemCard';
import { PerformanceHeader } from './PerformanceHeader';
import { DummyCards } from '../../common';
import { getItem } from './helpers';
import styles from './PerformanceComponent.module.css';

interface Props {
  width: number;
  displayType: string;
}

const cardWidth = 410;
const _PerformanceEmpty: React.FC<Props> = ({ width, displayType }) => {
  const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
  const handleRedirectToDetailView = (path: string) => {
    Router.push(`/${displayType}/stats?${path}`);
  };
  const item = getItem(displayType);

  return (
    <>
      { isDesktopView ? (
        <div className={styles.container}>
          <PerformanceHeader />
          <PerformanceItem
            item={item}
            onRedirectToDetailView={handleRedirectToDetailView} />
        </div>
      ) : (
        <div className={styles.cardItemsContainer}>
          <PerformanceItemCard
            item={item}
            onRedirectToDetailView={handleRedirectToDetailView} />
          { DummyCards(1, cardWidth) }
        </div>
      )}
    </>
  );
};

export const PerformanceEmpty = memo(_PerformanceEmpty);
