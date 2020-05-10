import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import dynamic from 'next/dynamic';

import { GET_USER_INFO } from '../../../../graphql/user/queries';
import { Button, Modal } from '../../../basic';
import { InputLike } from '../../../ui/InputLike';
import { LoadingIndicator, NoRecentData } from '../../../common';
import { NameModal } from './NameModal';
import { EmailModal } from './EmailModal';
import { PasswordModal } from './PasswordModal';
import styles from './index.module.css';
import styles_ext from '../AccountBalance.module.css';

interface Props {
  width: number;
}

const TelegramLoginWithNoSSR = dynamic(() => import('../../../ui/TelegramLogin'), { ssr: false });

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
      <div className={styles_ext.regionTitle}>User Info</div>
            <div className={styles_ext.surface}>
          {loading ? (
              <LoadingIndicator />
            ) : !data ? (
                  <NoRecentData message='No data received' />
            ) : (
                    <div className={styles.wrapper}>
                    <div className={styles.container}>
                            <div className={styles.formRow}>
                    <div className={styles.label}>Username</div>
                    <div className={styles.inputContainer}>
                                  <InputLike
                            value={data.users[0].name || ''}
                            onClickButton={handleOnCloseNameModal}
                            icon='account'
                                    />
                                </div>
                  </div>
                            <div className={styles.formRow}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.inputContainer}>
                                    <InputLike
                                    value={data.users[0].email || ''}
                                    onClickButton={handleOnCloseEmailModal}
                                    icon='email'
                                    />
                              </div>
                  </div>
                          {data.users[0].email && (
                            <div className={styles.formRow}>
                                  <div className={styles.label}>Password</div>
                                  <div className={styles.inputContainer}>
                                        <Button
                                        title='Change'
                                        type='dimmed'
                                            onClick={handleOnClosePasswordModal}
                                        icon='lockopen'
                                        />
                        </div>
                                </div>
                            )}
                          <div className={styles.formRow} style={{ marginBottom: 0 }}>
                                <div className={styles.label}>Telegram</div>
                    {data.users[0].telegram_id ? (
                                    <div className={styles.inputContainer}>
                            <div className={styles.telegramName}>
                                          {data.users[0].telegram_username || data.users[0].telegram_id}
                                        </div>
                          </div>
                                ) : (
                          <TelegramLoginWithNoSSR userId={data.users[0].id} />
                                )}
                  </div>
                          <Modal isOpen={isNameModalVisible} title='Change Name' onClose={handleOnCloseNameModal}>
                    <NameModal name={data.users[0].name || ''} onClose={handleOnCloseNameModal} />
                            </Modal>
                          <Modal isOpen={isEmailModalVisible} title={title} onClose={handleOnCloseEmailModal}>
                                <EmailModal
                              width={width}
                              email={data.users[0].email || ''}
                              onClose={handleOnCloseEmailModal}
                              setTitle={setTitle}
                                />
                            </Modal>
                          <Modal
                              isOpen={isPasswordModalVisible}
                              title='Change Password'
                              onClose={handleOnClosePasswordModal}>
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
