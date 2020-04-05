import React, { memo } from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import Router from 'next/router';

import { styles } from './index.style';
import { PerformanceItem } from './PerformanceItem';
import { PerformanceItemCard } from './PerformanceItemCard';
import { PerformanceHeader } from './PerformanceHeader';
import { ScreenTypeProps } from '../../../services/Screen';
import { DummyCards } from '../Common/DummyCards';
import { getItem } from './helpers';

interface Props {
  screenWidth: number;
  width: number;
  displayType: string;
}

const cardWidth = 410;
const _PerformanceEmpty: React.FC<Props> = ({ screenWidth, width, displayType }) => {
  const maxDesktop = screenType.maxDesktop();
  const handleRedirectToDetailView = (path: string) => {
    Router.push(`/${displayType}/stats?${path}`);
  };
  const item = getItem(displayType);

  return (
    <>
      { !maxDesktop ? (
        <Surface style={styles.container}>
          <PerformanceHeader />
          <PerformanceItem
            item={item}
            onRedirectToDetailView={handleRedirectToDetailView} />
        </Surface>
      ) : (
        <View style={styles.cardItemsContainer}>
          <PerformanceItemCard
            item={item}
            onRedirectToDetailView={handleRedirectToDetailView} />
          { DummyCards(1, cardWidth) }
        </View>
      )}
    </>
  );
};

export const PerformanceEmpty = memo(_PerformanceEmpty);
