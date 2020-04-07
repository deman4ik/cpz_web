import React, { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';

import { formatDate } from '../../../services/Utils';
import { vars } from '../../../styles';
import { showMessage, getRedirectionLink } from './helpers';
import { responsive } from './index.style';

interface Props {
  item: any;
  routeNotification: (action: { link: string; redirect: boolean }) => void;
  screenWidth: number;
}

export const _NotificationsItemCard: React.FC<Props> = ({ item, routeNotification, screenWidth }) => {
  const handleOnPressNotification = () => {
    routeNotification(getRedirectionLink(item));
  };

  return (
    <Surface
      style={responsive.card(screenWidth)}
      theme={{ roundness: 0 }}
    >
      <TouchableOpacity onPress={handleOnPressNotification}>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={{ color: vars.color.accent, fontSize: vars.font.size.small2 }}>
            {formatDate(item.timestamp)}
          </Text>
          { !item.readed ? <Text style={{ color: vars.color.negative, marginTop: -4 }}> *</Text> : null }
        </View>
        { showMessage(item, true) }
      </TouchableOpacity>
    </Surface>
  );
};

export const NotificationsItemCard = memo(_NotificationsItemCard);
