import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { withTranslation } from 'react-i18next';

import { AreaChart } from '../../charts/AreaChart';
import { Button } from '../../basic';
import { styles, responsive } from './PerformanceItemCard.style';
import { moneyFormat } from '../../../services/Utils';
import { PropsPerformanceItem } from './types';

const _PerformanceItemCard: React.FC<PropsPerformanceItem> =
({ t, item, screenType, onRedirectToDetailView }) => {
  const handleOnPress = () => {
    onRedirectToDetailView(item.path);
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.headerCard}>
        <TouchableOpacity style={styles.row} onPress={handleOnPress}>
          <View style={styles.col}>
            <Text style={[ styles.statValue, { marginBottom: 5 } ]}>{item.name}</Text>
            { item.profit ? (
              <Text style={responsive.profitText(item.profit)}>
                {`${item.profit > 0 ? '+' : ''}${moneyFormat(item.profit)} $`}
              </Text>
            ) : null}
          </View>
          <View style={styles.col}>
            <Button
              title={t('details')}
              isUppercase
              size='small'
              icon='chevron-right' />
          </View>
        </TouchableOpacity>
      </View>
      <View style={responsive.chartStat(screenType)}>
        <View style={styles.chartCol}>
          { (item.changes && item.changes.length) ? (
            <AreaChart
              height={120}
              positive={item.profit > 0}
              data={item.changes} />
          ) : <View style={styles.emptyChart} /> }
        </View>
        <View style={responsive.statCol(screenType)}>
          { (item.winRate || item.winRate === 0) ? (
            <>
              <View style={responsive.statRow(screenType)}>
                <Text style={responsive.label(screenType)}>
                  {t('winrateZero')}
                </Text>
                <Text style={styles.statValue}>
                  {item.winRate} %
                </Text>
              </View>
              <View style={responsive.statRow(screenType)}>
                <Text style={responsive.label(screenType)}>
                  {t('maxdrawdownZero')}
                </Text>
                <Text style={responsive.profitText(item.maxDrawdown)}>
                  {`${moneyFormat(item.maxDrawdown)} $`}
                </Text>
              </View>
              <View style={responsive.statRow(screenType)}>
                <Text style={responsive.label(screenType)}>
                  {t('tradescountZero')}
                </Text>
                <Text style={styles.statValue}>
                  {item.tradesCount}
                </Text>
              </View>
            </>
          ) : null }
        </View>
      </View>
    </Surface>
  );
};

export const PerformanceItemCard = memo(withTranslation()(_PerformanceItemCard));
