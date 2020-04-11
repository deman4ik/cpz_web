import React, { PropsWithChildren, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { CartFooter } from './common';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { register } from '../../../libs/auth';
import { Button, TextInput, Checkbox } from '../../basic';
import { PageHead, Footer } from '../../layout';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { styles, responsive } from './SignUp.style';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordRepeat: ''
};

const _SignUp: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const { screenType, setDimension } = useDimensionWidth();
  const client = useApolloClient();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);
  const [ keepSignedIn, setKeepSignedIn ] = useState(true);
  const [ isFetching, setIsFetching ] = useState(false);

  const toggleCheckBox = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  const handleOnPress = () => {
    handleSubmit();
  };

  const registerUser = async () => {
    const result = await register({ email: values.email, password: values.password }, client);

    if (result.success) {
      Router.push('/auth/verification');
    } else {
      errors.email = result.error;
      setIsFetching(false);
      setValid(false);
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
      <PageHead title={t('auth.titles.signUp')} />
      <View style={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu screenType={screenType} hasHomeButton />
      </View>
      <View style={responsive.plate(screenType)}>
        <View style={{ backgroundColor: '#242B4A' }}>
          <View style={responsive.card(screenType)}>
            <Text style={styles.title}>{t('auth.titles.signUp')}</Text>
            <TextInput
              value={values.email}
              error={errors.email}
              maxLength={255}
              placeholder={t('auth.form.placeholders.email')}
              onChangeText={(text: string) => handleChange('email', text)}
            />
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
            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 12, marginLeft: -8 }}>
              <Checkbox
                label={t('auth.form.keepSignedIn')}
                labelStyle={styles.checkboxLabel}
                isActive={keepSignedIn}
                onPress={toggleCheckBox}
              />
            </View>
            <Button
              type='success'
              size='big'
              title={t('auth.buttons.signUp')}
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

export const SignUp = withTranslation()(_SignUp);
