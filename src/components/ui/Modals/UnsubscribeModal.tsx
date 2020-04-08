import React, { memo, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { ROBOT } from '../../../graphql/local/queries';
import { UNSUBSCRIBE_FROM_SIGNALS } from '../../../graphql/signals/mutations';
import { UNSUBSCRIBE } from '../../../graphql/local/mutations';
import { Button } from '../../basic';
import { LoadingIndicator } from '../../common';
import { color } from '../../../styles/vars';
import { ErrorLine } from '../Common/ErrorLine';
import styles from './index.module.css';

interface Props {
  onDismiss: () => void;
  setTitle: (title: string) => void;
}

const _UnsubscribeModal: React.FC<Props> = ({ onDismiss, setTitle }) => {
  const [ formError, setFormError ] = useState('');
  const { data } = useQuery(ROBOT);
  const [ unsubscribeSend, { loading } ] = useMutation(UNSUBSCRIBE_FROM_SIGNALS);
  const [ unsubscribe ] = useMutation(UNSUBSCRIBE);

  useEffect(() => {
    setTitle(`$Unfollowing ${data.robot.name}`);
  });

  const handleOnSubmit = () => {
    unsubscribeSend({ variables: { robotId: data.robot.id } })
      .then(response => {
        if (response.data.userSignalUnsusbcribe.success) {
          unsubscribe({
            variables: { cache: data.robot.cache, chartData: data.ChartData }
          });
        } else {
          setFormError(response.data.userSignalSusbcribe.error);
        }
        onDismiss();
      });
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ErrorLine formError={formError} />
          <div className={styles.bodyTitle}>
            Are you sure you want to unsubscribe{'\n'}from {data ? data.robot.name : ''} signals?
          </div>
          <div className={styles.bodyText}>
            You will lost all your signals statistics for this robot!
          </div>
          <div className={styles.btnsContainer}>
            <Button
              className={styles.btn}
              title='Yes'
              icon='check'
              type='success'
              onClick={handleOnSubmit} />
            <Button
              className={styles.btn}
              title='No'
              icon='close'
              type='primary'
              onClick={onDismiss} />
          </div>
        </>
      )}
    </>
  );
};

export const UnsubscribeModal = memo(_UnsubscribeModal);
