import React, { PropsWithChildren, memo } from 'react';
import { View, Text } from 'react-native';
import { withTranslation, WithTranslation } from 'react-i18next';

import { styles } from './PerformanceHeader.style';

const _PerformanceHeader: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => (
  <View style={styles.headerContainer}>
    <Text style={[ styles.titleName, styles.titleFont ]}>{t('Name')}</Text>
    <Text style={[ styles.titlePerformance, styles.titleFont ]}>{t('Performance')}</Text>
    <Text style={[ styles.titleStatistics, styles.titleFont ]}>{t('Statistics')}</Text>
  </View>
);

export const PerformanceHeader = memo(withTranslation()(_PerformanceHeader));
