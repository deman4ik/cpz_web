import React, { memo } from 'react';
import { View } from 'react-native';

import { ScreenTypeProps } from '../../../services/Screen';
import { Button } from '../../basic';
import { styles } from './index.style';

interface Props {
  setVisibleToolbarFilters: () => void;
  screenType: ScreenTypeProps;
}

const _StatsPageButtonToolbar: React.FC<Props> = ({ setVisibleToolbarFilters, screenType }) => {
  const isTabletSize = screenType.maxTablet();
  const handleOnPress = () => {
    setVisibleToolbarFilters();
  };

  return (
    <View style={styles.rowContainer}>
      <Button
        title={!isTabletSize ? 'filter' : undefined}
        icon='filter-variant'
        isUppercase
        onPress={handleOnPress} />
    </View>
  );
};

export const StatsPageButtonToolbar = memo(_StatsPageButtonToolbar);
