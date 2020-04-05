import React, { PropsWithChildren, memo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { Surface } from 'react-native-paper';

import { common } from '../../../styles';

interface Props extends PropsWithChildren<WithTranslation> {
  item: any;
}

const _PerformanceTabItemCard: React.FC<Props> = ({ t, item }) => (
  <View key={item.title}>
    <View style={common.tableTitle}>
      <Text style={common.tableTitleText}>
        {t(item.title)}
      </Text>
    </View>
    <Surface style={common.mobileCard} theme={{ roundness: 0 }}>
      <View style={common.mobileCardText}>
        <Text style={common.mobileCardTextKey}>
          {t('All Trades')}
        </Text>
        <Text style={common.mobileCardTextValue}>{item.all}</Text>
      </View>
      <View style={common.mobileCardText}>
        <Text style={common.mobileCardTextKey}>
          {t('Long Trades')}
        </Text>
        <Text style={common.mobileCardTextValue}>{item.long}</Text>
      </View>
      <View style={common.mobileCardText}>
        <Text style={common.mobileCardTextKey}>
          {t('Short Trades')}
        </Text>
        <Text style={common.mobileCardTextValue}>{item.short}</Text>
      </View>
    </Surface>
  </View>
);

export const PerformanceTabItemCard = memo(withTranslation()(_PerformanceTabItemCard));
