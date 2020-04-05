import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { IconButton } from 'react-native-paper';

import { AreaChart } from '../../charts/AreaChart';
import { styles, responsive } from './PerformanceItem.style';
import { common, vars } from '../../../styles';
import { moneyFormat } from '../../../services/Utils';
import { PropsPerformanceItem } from './types';

const _PerformanceItem: React.FC<PropsPerformanceItem> = ({ t, item, onRedirectToDetailView }) => {
  const handleOnPress = () => {
    onRedirectToDetailView(item.path);
  };

  return (
    <View style={styles.tableRow}>
      <View style={{ flex: 0.8 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleOnPress}>
          <View>
            <Text style={[ common.tableCellText, { minWidth: 90 } ]}>{item.name}</Text>
            <Text style={[ styles.cellProfit, responsive.profitText(item.profit) ]}>
              {item.profit ? `${item.profit > 0 ? '+' : ''}${moneyFormat(item.profit)} $` : null}
            </Text>
          </View>
          <IconButton icon='chevron-right' color={vars.color.white} style={{ width: 15, height: 15 }} size={26} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.85 }}>
        { (item.changes && item.changes.length) ? (
          <AreaChart
            height={120}
            positive={item.profit > 0}
            data={item.changes} />
        ) : null }
      </View>
      <View style={{ flex: 0.05 }} />
      <View style={{ flex: 0.9 }}>
        { (item.winRate || item.winRate === 0) ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.secondaryText}>
                {`${t('winrateZero')}  `}
              </Text>
              <Text style={[ styles.secondaryText, { color: '#fff' } ]}>
                {`${item.winRate} %`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' }}>
              <Text
                style={styles.secondaryText}>
                {`${t('maxdrawdownZero')}  `}
              </Text>
              <Text
                style={[ styles.secondaryText, responsive.profitText(item.maxDrawdown), { fontSize: 14 } ]}>
                {`${moneyFormat(item.maxDrawdown)} $`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              <Text
                style={styles.secondaryText}>
                {`${t('tradescountZero')}  `}
              </Text>
              <Text style={[ styles.secondaryText, { color: '#fff' } ]}>
                {item.tradesCount}
              </Text>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export const PerformanceItem = memo(withTranslation()(_PerformanceItem));
