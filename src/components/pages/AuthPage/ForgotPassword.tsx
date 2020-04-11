import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import Router from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { CartFooter } from './common';
import { TextInput, Button } from '../../basic';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { PageHead, Footer } from '../../layout';
import { reset } from '../../../libs/auth';
import { styles, responsive } from './ForgotPassword.style';

const INITIAL_STATE = {
  email: ''
};

const _ForgotPassword: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const { screenType, setDimension } = useDimensionWidth();
  const [ isFetching, setIsFetching ] = useState(false);
  const client = useApolloClient();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);

  const handleOnPress = () => {
    handleSubmit();
  };

  const recoverPassword = async () => {
    const result = await reset(values.email, client);

    if (result.success) {
      Router.push('/auth/recover_password');
    } else {
      errors.email = result.error;
      setValid(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      setIsFetching(true);
      recoverPassword();
    }
  }, [ isValid ]);

  const handleOnLayout = () => {
    setDimension();
  };

  return (
    <View
      style={styles.container}
      onLayout={handleOnLayout}
    >
      <PageHead title={t('auth.forgotPasswordDescription')} />
      <View style={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu screenType={screenType} hasHomeButton />
      </View>
      <View style={responsive.plate(screenType)}>
        <View style={{ backgroundColor: '#242B4A' }}>
          <View style={responsive.card(screenType)}>
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.titleDescription}>
              {t('auth.forgotPasswordDescription')}
            </Text>
            <TextInput
              value={values.email}
              error={errors.email}
              maxLength={255}
              placeholder={t('auth.form.placeholders.email')}
              onChangeText={(text: string) => handleChange('email', text)}
            />
            <Button
              style={{ marginTop: 30 }}
              title={t('auth.buttons.passwordReset')}
              type='success'
              size='big'
              isUppercase
              isLoading={isFetching}
              onPress={handleOnPress}
            />
          </View>
          <CartFooter />
        </View>
      </View>
      <Footer screenType={screenType} />
    </View>
  );
};

export const ForgotPassword = withTranslation()(_ForgotPassword);
