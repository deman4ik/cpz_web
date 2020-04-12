/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import { ADD_TELEGRAM_ACCOUNT, UPDATE_USER } from '../../../../graphql/user/mutations';
import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { loginTelegram } from '../../../../libs/auth';
import { Modal } from '../../../basic';
import { LoadingIndicator } from '../../../common';
import styles from './TelegramLogin.module.css';

interface Props {
  userId?: number;
}

const buttonSize = 'medium';
const borderRadius = 2;
const requestAccess = 'write';
const userPic = true;
const _TelegramLogin: React.FC<Props> = ({ userId }) => {
  let instance;

  const [ error, setError ] = useState('');
  const [ loginLoading, setLoginLoading ] = useState(false);
  const [ addTelegram, { loading: addLoading } ] = useMutation(
    ADD_TELEGRAM_ACCOUNT
  );

  const login = async data => {
    setLoginLoading(true);
    const result = await loginTelegram(data);
    setLoginLoading(false);

    if (result.success) {
      Router.push('/robots');
    } else {
      setError(result.error);
    }
  };

  // For test only
  const [ logoutTelegram, { loading: logoutLoading } ] = useMutation(
    UPDATE_USER,
    {
      variables: {
        _set: {
          telegram_id: null,
          telegram_username: null
        },
        where: {
          id: { _eq: userId }
        }
      },
      refetchQueries: [ { query: GET_USER_INFO } ]
    }
  );


  useEffect(() => {
    (window as any).TelegramLoginWidget = userId
      ? {
        dataOnauth: data =>
          addTelegram({
            variables: { data },
            refetchQueries: [ { query: GET_USER_INFO } ]
          }).then(response => {
            if (response.data.setTelegram.error) {
              setError(response.data.setTelegram.error);
            }
          })
      }
      : {
        dataOnauth: data => login(data)
      };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.setAttribute('data-telegram-login', process.env.BOT_NAME);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', `${borderRadius}`);
    script.setAttribute('data-request-access', requestAccess);
    script.setAttribute('data-userpic', `${userPic}`);
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
    script.async = true;
    instance.prepend(script);
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/*<Button icon='close' onPress={logoutTelegram} />*/}
        {(loginLoading || addLoading || logoutLoading) && (
          <LoadingIndicator />
        )}
        <div ref={ref => (instance = ref)} />
      </div>
      <div className={styles.telegramPlaceholder}>
        If you do not see the Telegram login widget here, it seems that the
        Telegram is blocked in your country. Please use a proxy or VPN to access
        the Telegram login widget.
      </div>
      <Modal
        title='Error'
        isOpen={!!error}
        onClose={() => setError('')}>
        <div className={styles.errorText}>{error}</div>
      </Modal>
    </>
  );
};

export default memo(_TelegramLogin);
