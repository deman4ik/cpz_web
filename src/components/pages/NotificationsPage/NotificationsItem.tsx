import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { formatDate } from '../../../services/Utils';
import { common, vars } from '../../../styles';
import { showMessage, getRedirectionLink } from './helpers';

interface Props {
  item: any;
  routeNotification: (action: { link: string; redirect: boolean }) => void;
}

export const _NotificationsItem: React.FC<Props> = ({ item, routeNotification }) => {
  const handleOnPressNotification = () => {
    routeNotification(getRedirectionLink(item));
  };

  return (
    <View style={common.tableRow}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handleOnPressNotification}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: vars.color.accent, fontSize: vars.font.size.small2, marginBottom: 3 }}>
            {formatDate(item.timestamp)}
          </Text>
          { !item.readed ? <Text style={{ color: vars.color.negative, marginTop: -4 }}> *</Text> : null }
        </View>
        { showMessage(item) }
      </TouchableOpacity>
    </View>
  );
};

export const NotificationsItem = memo(_NotificationsItem);
