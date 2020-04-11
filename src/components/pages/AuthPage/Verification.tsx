import React, { PropsWithChildren, useEffect } from 'react';
import { View, Text } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import { useDimensionWidth } from '../../../hooks/useDimensions';
import { confirm } from '../../../libs/auth';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../services/Utils';
import { USER } from '../../../graphql/local/queries';
import { CartFooter } from './common';
import { Button, TextInput } from '../../basic';
import { HeaderMenu } from '../../layout/HeaderMenu';
import { Footer, PageHead } from '../../layout';
import { styles, responsive } from './Verification.style';

const INITIAL_STATE = {
  verificationCode: '',
};

const _Verification: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const { data, loading } = useQuery(USER);
  const { screenType, setDimension } = useDimensionWidth();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);

  const confirmCode = async () => {
    const result = await confirm({ userId: data.userId, secretCode: values.verificationCode });
    if (result.success) {
      Router.push('/auth/activate');
    } else {
      errors.verificationCode = result.error;
      setValid(false);
    }
  };

  const handleOnPress = async () => {
    handleSubmit();
  };

  const handleOnLayout = () => {
    setDimension();
  };

  useEffect(() => {
    if (!loading && data && !data.userId) {
      Router.push('/auth/signup');
    }
  }, [ data, loading ]);

  useEffect(() => {
    if (isValid) {
      confirmCode();
    }
  }, [ isValid ]);

  return (
    <View
      style={styles.container}
      onLayout={handleOnLayout}
    >
      <PageHead title={t('auth.titles.verification')} />
      <View style={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu screenType={screenType} hasHomeButton />
      </View>
      <View style={responsive.plate(screenType)}>
        <View style={{ backgroundColor: '#242B4A' }}>
          <View style={responsive.card(screenType)}>
            <Text style={styles.title}>{t('auth.titles.verification')}</Text>
            <Text style={styles.titleDescription}>{t('auth.verificationDescription')}</Text>
            <TextInput
              value={values.verificationCode}
              error={errors.verificationCode}
              placeholder={t('auth.form.placeholders.verification')}
              maxLength={6}
              onChangeText={(text: string) => handleChange('verificationCode', text)}
            />
            <Button
              size='big'
              style={{ marginTop: 30 }}
              title={t('auth.buttons.verifyEmail')}
              type='success'
              onPress={handleOnPress}
              isUppercase
            />
          </View>
          <CartFooter />
        </View>
      </View>
      <Footer screenType={screenType} />
    </View>
  );
};

export const Verification = withTranslation()(_Verification);
