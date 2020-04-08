import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { Button, Input } from '../../../basic';
import { LoadingIndicator } from '../../../common';
// import { NameModal } from './NameModal';
// import { EmailModal } from './EmailModal';
// import { PasswordModal } from './PasswordModal';
import styles from './index.module.css';
import styles_ext from '../AccountBalance.module.css';

const _UserInfo: React.FC = () => {
  const { data, loading } = useQuery(GET_USER_INFO);

  const [ isNameModalVisible, setNameModalVisible ] = useState(false);
  const [ isEmailModalVisible, setEmailModalVisible ] = useState(false);
  const [ isPasswordModalVisible, setPasswordModalVisible ] = useState(false);

  return (
    <>
      <div className={styles_ext.regionTitle}>
        User Info
      </div>
      <div className={styles_ext.surface}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className={styles.formRow}>
              <div className={styles.label}>
                Username
              </div>
              <div
                className={styles.inputContainer}
                onClick={() => setNameModalVisible(true)}
              >
                <Input
                  value={data.users[0].name || ''}
                  placeholder=''
                  icon='account'
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.label}>
                Email
              </div>
              <div
                className={styles.inputContainer}
                onClick={() => setEmailModalVisible(true)}
              >
                <Input
                  value={data.users[0].email || ''}
                  placeholder=''
                  icon='email'
                />
              </div>
            </div>
            {data.users[0].email && (
              <div className={styles.formRow}>
                <div className={styles.label}>
                  Password
                </div>
                <div
                  className={styles.inputContainer}
                  onClick={() => setPasswordModalVisible(true)}
                >
                  <Button
                    title='Change'
                    type='dimmed'
                    icon='lockopen' />
                </div>
              </div>
            )}
            {data.users[0].telegram_id && (
              <div className={[ styles.formRow, styles.lastFormRow ].join(' ')}>
                <div className={styles.label}>
                  Telegram
                </div>
                <div className={styles.inputContainer}>
                  <div className={styles.telegramName}>
                    {data.users[0].telegram_username
                    || data.users[0].telegram_id}
                  </div>
                </div>
              </div>
            )}
            {/* <NameModal
              name={data.users[0].name || ''}
              screenType={screenType}
              onDismiss={() => setNameModalVisible(false)}
              visible={isNameModalVisible}
            />
            <EmailModal
              email={data.users[0].email || ''}
              screenType={screenType}
              onDismiss={() => setEmailModalVisible(false)}
              visible={isEmailModalVisible}
            />
            <PasswordModal
              screenType={screenType}
              onDismiss={() => setPasswordModalVisible(false)}
              visible={isPasswordModalVisible}
            /> */}
          </>
        )}
      </div>
    </>
  );
};

export const UserInfo = memo(_UserInfo);
