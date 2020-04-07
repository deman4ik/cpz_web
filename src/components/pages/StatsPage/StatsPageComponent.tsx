import React, { PropsWithChildren, memo } from 'react';
import { Text } from 'react-native';
import { withTranslation, WithTranslation } from 'react-i18next';

import { ChartType } from '../../charts/LightWeightChart/types';
import { LightWeightChart } from '../../charts/LightWeightChart';
import { capitalize } from '../../../services/Utils';
import { PerformanceTabComponent } from '../../ui/PerformanceTab/PerformanceTabComponent';
import { styles } from '../../ui/PerformanceTab/index.style';
import { LoadingIndicator } from '../../ui/Common/LoadingIndicator';
import { Dimension } from '../../../config/types';

interface Props extends PropsWithChildren<WithTranslation> {
  formatData: any;
  dimension: Dimension;
  displayType: string;
}
const _StatsPageComponent: React.FC<Props> = ({ t, formatData, dimension, displayType }) => {
  const { screenType, screenWidth, isMobile } = dimension;
  const maxTablet = screenType.maxTablet();

  return (
    <>
      {!formatData.chartData || !formatData.chartData.length ? <LoadingIndicator /> : (
        <LightWeightChart
          data={formatData.chartData}
          type={ChartType.area}
          size={{ height: 470, screenWidth, isMobile }} />
      )}
      <Text style={styles.performanceTitle}>
        {t(`My ${capitalize(displayType)} Total Statistics`)}
      </Text>
      <PerformanceTabComponent maxTablet={maxTablet} robotStatistic={formatData.robotStatistic} />
    </>
  );
};

export const StatsPageComponent = memo(withTranslation()(_StatsPageComponent));
