/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useFormValidation } from '../../../../hooks/useFormValidation';
import { SET_USER_PASSWORD } from '../../../../graphql/user/mutations';
import { validateAuth } from '../../../../config/validation';
import { Input, Button } from '../../../basic';
import { ErrorLine } from '../../../common';
import styles from './PasswordModal.module.css';
import styles_main from './index.module.css';

interface Props {
  onClose: () => void;
}

const INITIAL_STATE = {
  passwordOld: '',
  password: '',
  passwordRepeat: ''
};

const _PasswordModal: React.FC<Props> = ({ onClose }) => {
  const [ formError, setFormError ] = useState('');
  const {
    handleSubmit,
    handleChange,
    resetValues,
    values,
    errors,
    isValid,
    setValid
  } = useFormValidation(INITIAL_STATE, validateAuth);

  const [ sendPassword, { loading, error } ] = useMutation(SET_USER_PASSWORD, {
    variables: { oldPassword: values.passwordOld, password: values.password }
  });
  if (error) {
    console.error(error);
  }

  const submit = () => {
    sendPassword().then(response => {
      if (response.data.changePassword.success) {
        resetValues();
        setFormError('');
        onClose();
      } else {
        setFormError(response.data.changePassword.error);
        setValid(false);
      }
    });
  };

  useEffect(() => {
    if (isValid) {
      submit();
    }
  }, [ isValid ]);

  const onKeyPress = e => {
    if (e.nativeEvent.key === 'Enter' && isValid) {
      handleSubmit();
    }
  };

  return (
    <>
      {formError && (
      <ErrorLine formError={formError} />
      )}
      <div className={styles.form}>
        <div className={styles.fieldset}>
          <div className={styles_main.formRow}>
            <div className={styles.label}>
              Old Password
            </div>
            <div className={styles_main.inputContainer}>
              <Input
                value={values.passwordOld}
                type='password'
                width={210}
                onChangeText={(text: string) => handleChange('passwordOld', text)}
                onKeyPress={onKeyPress} />
            </div>
          </div>
          <div className={styles_main.formRow}>
            <div className={styles.label}>
              New Password <span className={styles.star}>*</span>
            </div>
            <div className={styles_main.inputContainer}>
              <Input
                value={values.password}
                error={!!errors.password}
                width={210}
                type='password'
                onChangeText={(text: string) => handleChange('password', text)}
                onKeyPress={onKeyPress}
                />
            </div>
          </div>
          <div className={styles_main.formRow}>
            <div className={styles.label}>
              Repeat Password <span className={styles.star}>*</span>
            </div>
            <div className={styles_main.inputContainer}>
              <Input
                value={values.passwordRepeat}
                error={!!errors.passwordRepeat}
                width={210}
                type='password'
                onChangeText={(text: string) => handleChange('passwordRepeat', text)}
                onKeyPress={onKeyPress} />
            </div>
          </div>
          <div className={styles.btns}>
            <Button
              className={styles.btn}
              width={120}
              title='Change'
              icon='check'
              type='success'
              isUppercase
              isLoading={loading}
              onClick={handleSubmit} />
            <Button
              className={styles.btn}
              width={120}
              title='Cancel'
              icon='close'
              type='dimmed'
              isUppercase
              onClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export const PasswordModal = memo(_PasswordModal);
