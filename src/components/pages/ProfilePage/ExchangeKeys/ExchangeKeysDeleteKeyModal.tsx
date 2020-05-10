import React, { memo, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_USER_ROBOTS_BY_EXCHANGE_ID } from '../../../../graphql/robots/queries';
import { GET_USER_EXCHANGES } from '../../../../graphql/profile/queries';
import { DELETE_EXCHANGE_BY_ID } from '../../../../graphql/profile/mutations';
import { DeleteKey } from './types';
import { Button } from '../../../basic';
import { ErrorLine } from '../../../common';
import { AlertIcon } from '../../../../assets/icons/svg';
import styles from './ExchangeKeysDeleteKeyModal.module.css';

interface Props {
  onClose: () => void;
  options: DeleteKey;
}

const _ExchangeKeysDeleteKeyModal: React.FC<Props> = ({ options, onClose }) => {
  const [ formError, setFormError ] = useState('');
  const [ disabledYes, setDisableYes ] = useState(false);
  const [ isFetchReponse, setIsFetchReponse ] = useState(false);
  const { data, loading } = useQuery(GET_USER_ROBOTS_BY_EXCHANGE_ID, {
    variables: {
      user_ex_acc_id: options.id
    }
  });
  const [ deleteKey ] = useMutation(DELETE_EXCHANGE_BY_ID, {
    variables: {
      id: options.id
    },
    refetchQueries: [ { query: GET_USER_EXCHANGES } ]
  });

  const handleOnPressSubmit = () => {
    setIsFetchReponse(true);
    deleteKey().then((response) => {
      setIsFetchReponse(false);
      if (response.data.userExchangeAccDelete.error) {
        setFormError(response.data.userExchangeAccDelete.error);
      }
      onClose();
    });
  };

  useEffect(() => {
    if (!loading) {
      setDisableYes(data.user_robots.length !== 0);
    }
  }, [ loading, data ]);

  return (
      <>
          {formError && <ErrorLine formError={formError} />}
          {disabledYes && (
            <div className={styles.bodyTitle}>
                  <AlertIcon size={48} />
                  {'\n'}
                  <span className={styles.bodyText}>You can&apos;t delete API Keys with added Robots</span>
                </div>
            )}
            <div className={styles.btnsContainer}>
                <Button
                className={styles.btn}
                title='Yes'
                icon='check'
                type='success'
                disabled={disabledYes}
                isLoading={isFetchReponse}
                    onClick={handleOnPressSubmit}
                />
          <Button className={styles.btn} title='No' icon='close' type='primary' onClick={onClose} />
        </div>
        </>
  );
};

export const ExchangeKeysDeleteKeyModal = memo(_ExchangeKeysDeleteKeyModal);
