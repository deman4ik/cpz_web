import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { Button, Input, Modal } from '../../../basic';
import { LoadingIndicator } from '../../../common';
import { NameModal } from './NameModal';
import { EmailModal } from './EmailModal';
import { PasswordModal } from './PasswordModal';
import styles from './index.module.css';
import styles_ext from '../AccountBalance.module.css';

interface Props {
  width: number;
}

const _UserInfo: React.FC<Props> = ({ width }) => {
  const { data, loading } = useQuery(GET_USER_INFO);
  const [ title, setTitle ] = useState('');
  const [ isNameModalVisible, setNameModalVisible ] = useState(false);
  const [ isEmailModalVisible, setEmailModalVisible ] = useState(false);
  const [ isPasswordModalVisible, setPasswordModalVisible ] = useState(false);

  const handleOnClosePasswordModal = () => {
    setPasswordModalVisible(!isPasswordModalVisible);
  };

  const handleOnCloseNameModal = () => {
    setNameModalVisible(!isNameModalVisible);
  };

  const handleOnCloseEmailModal = () => {
    setEmailModalVisible(!isEmailModalVisible);
  };

  return (
    <>
      <div className={styles_ext.regionTitle}>
        User Info
      </div>
      <div className={styles_ext.surface}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.formRow}>
                <div className={styles.label}>
                  Username
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    value={data.users[0].name || ''}
                    placeholder=''
                    onClickButton={handleOnCloseNameModal}
                    responsive
                    icon='account' />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.label}>
                  Email
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    value={data.users[0].email || ''}
                    placeholder=''
                    onClickButton={handleOnCloseEmailModal}
                    responsive
                    icon='email' />
                </div>
              </div>
              {data.users[0].email && (
              <div className={styles.formRow}>
                <div className={styles.label}>
                  Password
                </div>
                <div className={styles.inputContainer}>
                  <Button
                    title='Change'
                    type='dimmed'
                    onClick={handleOnClosePasswordModal}
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
              <Modal
                isOpen={isNameModalVisible}
                title='Change Name'
                onClose={handleOnCloseNameModal}
              >
                <NameModal
                  name={data.users[0].name || ''}
                  onClose={handleOnCloseNameModal} />
              </Modal>
              <Modal
                isOpen={isEmailModalVisible}
                title={title}
                onClose={handleOnCloseEmailModal}
              >
                <EmailModal
                  width={width}
                  email={data.users[0].email || ''}
                  onClose={handleOnCloseEmailModal}
                  setTitle={setTitle} />
              </Modal>
              <Modal
                isOpen={isPasswordModalVisible}
                title='Change Password'
                onClose={handleOnClosePasswordModal}
              >
                <PasswordModal onClose={handleOnClosePasswordModal} />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const UserInfo = memo(_UserInfo);
