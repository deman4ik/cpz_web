/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SECRET_CODE_LENGTH } from '../../../../config/constants';
import { CHANGE_USER_EMAIL, CONFIRM_USER_EMAIL } from '../../../../graphql/user/mutations';
import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { validateEmail } from '../../../../config/validation';
import { Input, Button } from '../../../basic';
import styles from './EmailModal.module.css';

interface Props {
  email: string;
  setTitle: (title: string) => void;
  onClose: () => void;
}

const steps = [ 'Enter new Email', 'Confirm Email change' ];
const _EmailModal: React.FC<Props> = ({ email, onClose, setTitle }) => {
  const [ formError, setFormError ] = useState('');
  const [ secretCode, setSecretCode ] = useState('');
  const [ step, setStep ] = useState(1);
  const [ newEmail, setNewEmail ] = useState(email);

  const [ sendChangeEmail, { loading: changeLoading, error: changeError } ] = useMutation(CHANGE_USER_EMAIL, {
    variables: { email: newEmail }
  });

  const [ sendConfirmEmail, { loading: confirmLoading, error: confirmError } ] = useMutation(CONFIRM_USER_EMAIL, {
    variables: { secretCode },
    refetchQueries: [ { query: GET_USER_INFO } ]
  });

  if (changeError || confirmError) {
    console.error(changeError || confirmError);
  }

  useEffect(() => {
    setTitle('1');
  }, []);

  const onAcceptEmail = () => {
    sendChangeEmail().then(response => {
      if (response.data.changeEmail.success) {
        setStep(2);
        setTitle(steps[step - 1].toString());
      } else {
        setFormError(response.data.changeEmail.error);
      }
    });
  };

  const onConfirmEmail = () => {
    sendConfirmEmail().then(response => {
      if (response.data.confirmChangeEmail.success) {
        onClose();
      } else {
        setFormError(response.data.confirmChangeEmail.error);
      }
    });
  };

  const isValidEmail = () => email !== newEmail && validateEmail(newEmail);
  const isValidSecretCode = () => secretCode && secretCode.length === SECRET_CODE_LENGTH;

  const onKeyPressChange = e => {
    if (formError) {
      setFormError('');
    }

    if (e.nativeEvent.key === 'Enter' && isValidEmail) {
      onAcceptEmail();
    }
  };

  const onKeyPressConfirm = e => {
    if (formError) {
      setFormError('');
    }

    if (e.nativeEvent.key === 'Enter' && isValidSecretCode) {
      onConfirmEmail();
    }
  };

  return (
    <>
      <div className={styles.wizardContainer}>
        {/* <StepWizard
            steps={steps}
            active={step}
            height={90}
            titleWidth={160}
            screenType={screenType}
          /> */}
      </div>
      <div className={styles.form}>
        <div className={styles.fieldset}>
          {step === 1 ? (
            <Input
              placeholder='Email'
              width={260}
              error={!isValidEmail()}
              value={`${newEmail}`}
              onChangeText={value => setNewEmail(value)}
              onKeyPress={onKeyPressChange} />
          ) : (
            <>
              <div className={styles.description}>
                A letter with a confirmation code was sent to your new Email address, please enter the code from the letter in the field below
              </div>
              <Input
                error={!isValidSecretCode()}
                width={260}
                placeholder='Confirmation code'
                value={`${secretCode}`}
                maxLength={SECRET_CODE_LENGTH}
                onChangeText={value => setSecretCode(value)}
                onKeyPress={onKeyPressConfirm} />
            </>
          )}
          {step === 1 ? (
            <div className={styles.btns}>
              <Button
                className={styles.btn}
                width={130}
                title='Accept'
                icon='check'
                type='success'
                disabled={!isValidEmail()}
                isUppercase
                isLoading={changeLoading}
                onClick={onAcceptEmail}
                />
              <Button
                className={styles.btn}
                width={120}
                title='Cancel'
                icon='close'
                type='dimmed'
                isUppercase
                onClick={onClose}
                />
            </div>
          ) : (
            <div className={styles.btns}>
              <Button
                className={styles.btn}
                width={120}
                title='Back'
                icon='chevronleft'
                type='dimmed'
                isUppercase
                onClick={() => setStep(1)}
                />
              <Button
                className={styles.btn}
                width={130}
                title='Confirm'
                icon='check'
                type='success'
                disabled={!isValidSecretCode()}
                isUppercase
                isLoading={confirmLoading}
                onClick={onConfirmEmail}
                />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const EmailModal = memo(_EmailModal);
