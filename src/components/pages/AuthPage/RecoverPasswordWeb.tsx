/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Footer, PageHead, Header } from '../../layout';
import { CartFooter } from './common/CartFooter';
import { Button, Input } from '../../basic';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAuth } from '../../../config/validation';
import { recoverEncoded } from '../../../libs/auth';
import styles from './index.module.css';

const INITIAL_STATE = {
  password: '',
  passwordRepeat: ''
};

export const RecoverPasswordWeb: React.FC = () => {
  const [ isFetching, setIsFetching ] = useState(false);
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

  return (
    <div className={styles.container}>
      <PageHead title='Reset password' />
      <div className={styles.header}>
        <Header hasHomeButton />
      </div>
      <div className={styles.plate}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.title}>Reset password</div>
            <Input
              value={values.password}
              style={{ marginTop: 8 }}
              error={errors.password}
              maxLength={100}
              placeholder='Password'
              width={260}
              type='password'
              onChangeText={(text: string) => handleChange('password', text)} />
            <Input
              value={values.passwordRepeat}
              style={{ marginTop: 8 }}
              error={errors.passwordRepeat}
              maxLength={100}
              width={260}
              type='password'
              placeholder='Repeat password'
              onChangeText={(text: string) => handleChange('passwordRepeat', text)} />
            <Button
              type='success'
              size='big'
              style={{ marginTop: 12 }}
              title='Reset'
              width={260}
              isUppercase
              isLoading={isFetching}
              onClick={handleOnPress}
            />
          </div>
          <CartFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};
