import React, { PropsWithChildren, memo } from 'react';
import { View, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import { WithTranslation, withTranslation } from 'react-i18next';

import { NoRecentData } from '../Common/NoRecentData';
import { PerformanceTabItem } from './PerformanceTabItem';
import { PerformanceTabItemCard } from './PerformanceTabItemCard';
import { Signals } from '../../../services';
import { common } from '../../../styles';

interface Props extends PropsWithChildren<WithTranslation> {
  robotStatistic: any;
  maxTablet: boolean;
}

const _PerformanceTabComponent: React.FC<Props> = ({ t, robotStatistic, maxTablet }) => (
  <Surface
    style={common.accordionSurface}
    theme={{ roundness: 0 }}
          >
    {!maxTablet && Signals.renderTableHeaders()}
    {!robotStatistic ? (
      <NoRecentData message='No recent data available' />
    ) : (
      <>
        {Object.keys(robotStatistic).map(subtitle => (
          <View key={subtitle}>
            {!maxTablet ? (
              <>
                <View style={common.tableTitle}>
                  <Text style={common.tableTitleText}>
                    {t(subtitle)}
                  </Text>
                </View>
                { robotStatistic[subtitle].map((item, idx) => (
                  <PerformanceTabItem key={idx} item={item} />
                )) }
              </>
            ) : (
              <>
                { robotStatistic[subtitle].map((item, idx) => (
                  <PerformanceTabItemCard key={idx} item={item} />
                )) }
              </>
            )}
          </View>
        ))}
      </>
    )}
  </Surface>
);

export const PerformanceTabComponent = memo(withTranslation()(_PerformanceTabComponent));
