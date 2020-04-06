import React, { PropsWithChildren, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import Router from 'next/router';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Button } from '../../basic';
import { responsive, styles } from './SignalRobotsAddSignals.style';

interface Props extends PropsWithChildren<WithTranslation> {
  screenWidth?: number;
  displayType: string;
}

const _SignalRobotsAddSignalsCard: React.FC<Props> = ({ t, screenWidth, displayType }) => {
  const handleOnPress = () => {
    Router.push(`/${displayType}/search`);
  };

  return (
    <Surface style={responsive.itemContainerCard(screenWidth)}>
      <TouchableOpacity
        style={styles.border}
        onPress={handleOnPress}
      >
        <Button
          title={t(`Add ${displayType}`)}
          icon='plus'
          isUppercase
        />
      </TouchableOpacity>
    </Surface>
  );
};

export const SignalRobotsAddSignalsCard = memo(withTranslation()(_SignalRobotsAddSignalsCard));
