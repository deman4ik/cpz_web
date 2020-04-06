import React, { PropsWithChildren, memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Router from 'next/router';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Button } from '../../basic';
import { styles } from './SignalRobotsAddSignals.style';

interface Props extends PropsWithChildren<WithTranslation> {
  displayType: string;
}

const _SignalRobotsAddSignals: React.FC<Props> = ({ t, displayType }) => {
  const handleOnPress = () => {
    Router.push(`/${displayType}/search`);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[ styles.border, { minHeight: 68 } ]}
        onPress={handleOnPress}
      >
        <Button
          title={t(`Add ${displayType}`)}
          icon='plus'
          isUppercase
        />
      </TouchableOpacity>
    </View>
  );
};

export const SignalRobotsAddSignals = memo(withTranslation()(_SignalRobotsAddSignals));
