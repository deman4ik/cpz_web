import React, { PropsWithChildren, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import Router from 'next/router';
import { WithTranslation, withTranslation } from 'react-i18next';
import { styles } from './CartFooter.style';

const _CartFooter: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const handleSwitchBackToLogin = () => {
    Router.push('/auth/login');
  };

  return (
    <View style={[ styles.footer ]}>
      <TouchableOpacity style={{ justifyContent: 'center', flexDirection: 'row' }} onPress={handleSwitchBackToLogin}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            size={20}
            color='white'
            icon='chevron-left' />
          <Text style={{ color: 'white' }}>
            {t('auth.buttons.backToLogin')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const CartFooter = memo(withTranslation()(_CartFooter));
