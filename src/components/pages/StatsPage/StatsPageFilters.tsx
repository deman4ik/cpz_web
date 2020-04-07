import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { Button } from '../../basic';
import { styles } from './StatsPageFilters.style';
import { exchangeName, capitalize } from '../../../services/Utils';

interface Props {
  filterItem: {
    items: string[];
    label: string;
  };
  labelsCombination: string[];
  label: string;
  checkedItem: string;
  checkFilterButton: (label: string, item: string) => void;
  availableFilters: string[];
}

const _StatsPageFilters: React.FC<Props> =
  ({ filterItem, checkFilterButton, label, labelsCombination, checkedItem, availableFilters }) => {
    const handleOnPressItem = (item: string) => {
      checkFilterButton(filterItem.label, item);
    };

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: 72 }}>
          <Text style={styles.labelText}>{`${capitalize(label)}:`}</Text>
        </View>
        <View style={styles.btnContainer}>
          { labelsCombination.map((item: string) => {
            const availableButton = availableFilters.includes(item);
            return (
              <Button
                key={item}
                disabled={!availableButton}
                type={checkedItem === item ? 'rounded-primary' : !availableButton ? 'rounded-negative' : 'rounded'}
                title={exchangeName(item)}
                onPress={() => handleOnPressItem(item)} />
            );
          })}
        </View>
      </View>
    );
  };

export const StatsPageFilters = memo(_StatsPageFilters);
