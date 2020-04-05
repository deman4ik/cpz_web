import React, { PropsWithChildren, memo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { common } from '../../../styles';

interface Props extends PropsWithChildren<WithTranslation> {
  item: any;
}

const _PerformanceTabItem: React.FC<Props> = ({ t, item }) => (
  <View style={common.tableRow}>
    <View style={{ flex: 0.25 }}>
      <Text style={common.mobileCardTextKey}>
        {t(item.title)}
      </Text>
    </View>
    <View style={{ flex: 0.25 }}>
      <Text style={common.tableCellText}>
        {item.all}
      </Text>
    </View>
    <View style={{ flex: 0.25 }}>
      <Text style={common.tableCellText}>
        {item.long}
      </Text>
    </View>
    <View style={{ flex: 0.25 }}>
      <Text style={common.tableCellText}>
        {item.short}
      </Text>
    </View>
  </View>
);

export const PerformanceTabItem = memo(withTranslation()(_PerformanceTabItem));
