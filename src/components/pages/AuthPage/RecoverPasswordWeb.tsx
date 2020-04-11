import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import Router, { useRouter } from 'next/router';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { Footer, PageHead } from '../../layout';
import { CartFooter } from './common';
import { Button, TextInput } from '../../basic';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { recoverEncoded } from '../../../libs/auth';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { styles, responsive } from './RecoverPassword.style';

const INITIAL_STATE = {
  password: '',
  passwordRepeat: ''
};

const _RecoverPasswordWeb: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const [ isFetching, setIsFetching ] = useState(false);
  const { screenType, setDimension } = useDimensionWidth();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);
  const router = useRouter();

  const handleOnPress = () => {
    handleSubmit();
  };

  const registerUser = async () => {
    const result = await recoverEncoded(router.query.encoded as string, values.password);
    if (result.success) {
      Router.push('/auth/done');
    } else {
      errors.password = result.error;
      setValid(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      setIsFetching(true);
      registerUser();
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
              value={values.password}
              style={{ marginTop: 8 }}
              error={errors.password}
              maxLength={100}
              placeholder={t('auth.form.placeholders.password')}
              onChangeText={(text: string) => handleChange('password', text)}
              secureTextEntry
            />
            <TextInput
              value={values.passwordRepeat}
              style={{ marginTop: 8 }}
              error={errors.passwordRepeat}
              maxLength={100}
              placeholder={t('auth.form.placeholders.passwordRepeat')}
              onChangeText={(text: string) => handleChange('passwordRepeat', text)}
              secureTextEntry
            />
            <Button
              type='success'
              size='big'
              style={{ marginTop: 16 }}
              title={t('auth.buttons.reset')}
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

export const RecoverPasswordWeb = withTranslation()(_RecoverPasswordWeb);
