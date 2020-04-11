import React, { PropsWithChildren, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import Router from 'next/router';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { login } from '../../../libs/auth';
import { TextInput, Button, Checkbox, TelegramLoginButton } from '../../basic';
import { PageHead } from '../../layout';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { Footer } from '../../layout';
import { styles, responsive } from './Login.style';
import { vars } from '../../../styles';

const INITIAL_STATE = {
  email: ''
};

const _Login: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const { screenType, setDimension } = useDimensionWidth();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);
  const [ password, setPassword ] = useState('');
  const [ keepSignedIn, setKeepSignedIn ] = useState(true);
  const [ isFetching, setIsFetching ] = useState(false);

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const toggleCheckBox = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  const handleOnLayout = () => {
    setDimension();
  };

  const handleLogin = () => {
    handleSubmit();
  };

  const loginUser = async () => {
    const result = await login({
      email: values.email,
      password
    });

    if (result.success) {
      Router.push('/robots');
    } else {
      errors.password = result.error;
      setValid(false);
      setIsFetching(false);
    }
  };

  const handleSwitchToStep = (step: string) => {
    if (step === 'signUp') {
      Router.push('/auth/signup');
    } else {
      Router.push('/auth/forgot_password');
    }
  };

  useEffect(() => {
    if (isValid) {
      setIsFetching(true);
      loginUser();
    }
  }, [ isValid ]);

  return (
    <View
      style={[ styles.container, { alignContent: 'space-between', alignItems: 'center' } ]}
      onLayout={handleOnLayout}
    >
      <PageHead title={t('auth.titles.login')} />
      <View style={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu screenType={screenType} hasHomeButton />
      </View>
      <View style={responsive.plate(screenType)}>
        <View style={{ backgroundColor: '#242B4A' }}>
          <View style={responsive.content(screenType)}>
            <View style={responsive.card(screenType)}>
              <Text style={styles.title}>{t('auth.titles.login')}</Text>
              <TextInput
                error={errors.email}
                value={values.email}
                maxLength={255}
                placeholder={t('auth.form.placeholders.email')}
                onChangeText={(text: string) => handleChange('email', text)}
              />
              <TextInput
                style={{ marginTop: 8 }}
                value={password}
                maxLength={100}
                error={errors.password}
                placeholder={t('auth.form.placeholders.password')}
                onChangeText={text => onChangePassword(text)}
                secureTextEntry
              />
              <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 12, marginLeft: -8 }}>
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
                title={t('log in')}
                isUppercase
                isLoading={isFetching}
                onPress={handleLogin}
              />
            </View>
            <View style={styles.divider} />
            <View style={responsive.card(screenType)}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  paddingTop: 22,
                  paddingBottom: 20
                }}>
                {t('auth.createAccountDescription')}
              </Text>
              <Button
                type='primary'
                size='big'
                title={t('auth.buttons.createAccount')}
                isUppercase
                onPress={() => {
                  handleSwitchToStep('signUp');
                }}
              />
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    paddingTop: 50,
                    paddingBottom: 20
                  }}>
                  {t('auth.orSignUpUsing')}
                </Text>
                <TelegramLoginButton
                  screenType={screenType}
                  buttonSize='large'
                  borderRadius={vars.borderRadius.normal}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.footer,
              { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }
            ]}>
            <Text style={{ color: 'white' }}>{t('auth.cantLogin')}&nbsp;</Text>
            <Text style={{ color: 'white' }}>
              {t('auth.didYou')}
              <TouchableOpacity
                onPress={() => {
                  handleSwitchToStep('forgotPassword');
                }}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: 'white'
                  }}>
                  {t('auth.forgotPassword')}
                </Text>
              </TouchableOpacity>
              {t('auth.questionMark')}
            </Text>
          </View>
        </View>
      </View>
      <Footer screenType={screenType} />
    </View>
  );
};

export const Login = withTranslation()(_Login);
