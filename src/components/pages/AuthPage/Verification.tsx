/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

import { confirm } from '../../../libs/auth';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../config/validation';
import { USER } from '../../../graphql/local/queries';
import { CartFooter } from './common/CartFooter';
import { Button, Input } from '../../basic';
import { Footer, PageHead, Header } from '../../layout';
import styles from './index.module.css';

const INITIAL_STATE = {
  verificationCode: '',
};

export const Verification: React.FC = () => {
  const { data, loading } = useQuery(USER);
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
    <div className={styles.container}>
      <PageHead title='Verification' />
      <div className={styles.header}>
        <Header hasHomeButton />
      </div>
      <div className={styles.plate}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.title}>Verification</div>
            <div className={styles.titleDescription}>Enter the verification code you recieved via Email below.</div>
            <Input
              value={values.verificationCode}
              error={!!errors.verificationCode}
              placeholder='Verification code'
              maxLength={6}
              width={260}
              onChangeText={(text: string) => handleChange('verificationCode', text)} />
            <Button
              size='big'
              style={{ marginTop: 30 }}
              title='Verify my email address'
              type='success'
              width={260}
              onClick={handleOnPress}
              isUppercase />
          </div>
          <CartFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};
