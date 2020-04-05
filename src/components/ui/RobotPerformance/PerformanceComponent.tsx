import React, { memo } from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import Router from 'next/router';

import { styles } from './index.style';
import { PerformanceItem } from './PerformanceItem';
import { PerformanceItemCard } from './PerformanceItemCard';
import { PerformanceHeader } from './PerformanceHeader';
import { useDummyCarts } from '../../../hooks/useDummyCarts';
import { DummyCards } from '../Common/DummyCards';
import { ScreenTypeProps } from '../../../services/Screen';

interface Props {
  formatData: any;
  screenWidth: number;
  screenType: ScreenTypeProps;
  displayType: string;
}

const cardWidth = 410;
const _PerformanceComponent: React.FC<Props> = ({ screenWidth, screenType, formatData, displayType }) => {
  const maxDesktop = screenType.maxDesktop();
  const { dummyCards } = useDummyCarts(screenWidth, cardWidth, formatData.length);

  const handleRedirectToDetailView = (path: string) => {
    Router.push(`/${displayType}/stats?${path}`);
  };

  return (
    <>
      { !maxDesktop ? (
        <Surface style={styles.container}>
          <PerformanceHeader />
          { formatData.map(item => (
            <PerformanceItem
              key={item.id}
              item={item}
              onRedirectToDetailView={handleRedirectToDetailView} />
          )) }
        </Surface>
      ) : (
        <View style={styles.cardItemsContainer}>
          { formatData.map(item => (
            <PerformanceItemCard
              key={item.id}
              item={item}
              screenType={screenType}
              screenWidth={screenWidth}
              onRedirectToDetailView={handleRedirectToDetailView} />
          )) }
          {DummyCards(dummyCards, cardWidth)}
        </View>
      )}
    </>
  );
};

export const PerformanceComponent = memo(_PerformanceComponent);
