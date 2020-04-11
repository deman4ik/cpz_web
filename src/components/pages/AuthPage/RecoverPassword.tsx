import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { USER } from '../../../graphql/local/queries';
import { CartFooter } from './common';
import { Button, TextInput } from '../../basic';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { recover } from '../../../libs/auth';
import { Footer, PageHead } from '../../layout';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { styles, responsive } from './RecoverPassword.style';

const INITIAL_STATE = {
  verificationCode: '',
  password: '',
  passwordRepeat: ''
};

const _RecoverPassword: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const [ isFetching, setIsFetching ] = useState(false);
  const { screenType, setDimension } = useDimensionWidth();
  const { data } = useQuery(USER);
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
    const result = await recover({ userId: data.userId, secretCode: values.verificationCode, password: values.password });
    if (result.success) {
      Router.push('/auth/done');
    } else {
      errors.verificationCode = result.error;
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
      <PageHead title={t('auth.titles.resetPassword')} />
      <View style={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu screenType={screenType} hasHomeButton />
      </View>
      <View style={responsive.plate(screenType)}>
        <View style={{ backgroundColor: '#242B4A' }}>
          <View style={responsive.card(screenType)}>
            <Text style={styles.title}>{t('auth.titles.resetPassword')}</Text>
            <TextInput
              value={values.verificationCode}
              error={errors.verificationCode}
              placeholder={t('auth.form.placeholders.verification')}
              maxLength={6}
              onChangeText={(text: string) => handleChange('verificationCode', text)}
            />
            <TextInput
              value={values.password}
              style={{ marginTop: 8 }}
              maxLength={100}
              error={errors.password}
              placeholder={t('auth.form.placeholders.password')}
              onChangeText={(text: string) => handleChange('password', text)}
              secureTextEntry
            />
            <TextInput
              value={values.passwordRepeat}
              style={{ marginTop: 8 }}
              maxLength={100}
              error={errors.passwordRepeat}
              placeholder={t('auth.form.placeholders.passwordRepeat')}
              onChangeText={(text: string) => handleChange('passwordRepeat', text)}
              secureTextEntry
            />
            <Button
              type='success'
              size='big'
              style={{ marginTop: 16 }}
              title={t('auth.buttons.reset')}
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

export const RecoverPassword = withTranslation()(_RecoverPassword);
