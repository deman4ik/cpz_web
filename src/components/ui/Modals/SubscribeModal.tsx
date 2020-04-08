/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ROBOT } from '../../../graphql/local/queries';
import { GET_MARKETS } from '../../../graphql/common/queries';
import { SUBSCRIBE_TO_SIGNALS } from '../../../graphql/signals/mutations';
import { SUBSCRIBE } from '../../../graphql/local/mutations';
import { Button, Input } from '../../basic';
import { moneyFormat } from '../../../config/utils';
import { ErrorLine, LoadingIndicator } from '../../common';
import styles from './index.module.css';
import styles_subs from './SubscribeModal.module.css';

interface Props {
  type?: string;
  setTitle: (title: string) => void;
  searchName?: string;
  onClose: () => void;
}

const _SubscribeModal: React.FC<Props> = ({ type, setTitle, onClose, searchName }) => {
  const [ formError, setFormError ] = useState('');
  const { data: dataRobot } = useQuery(ROBOT);
  const [ inputVolume, setInputVolume ] = useState('0');

  useEffect(() => {
    if (dataRobot) {
      setInputVolume(dataRobot.robot.subs.volume);
      setTitle(dataRobot.robot.subs.volume ?
        `Following ${dataRobot.robot.name}` :
        `Subscribing to ${dataRobot.robot.name} signals`);
    }
  }, [ dataRobot ]);

  const { data, loading } = useQuery(GET_MARKETS, {
    variables: {
      exchange: !dataRobot ? null : dataRobot.robot.subs.exchange,
      asset: !dataRobot ? null : dataRobot.robot.subs.asset,
      currency: !dataRobot ? null : dataRobot.robot.subs.currency
    },
    skip: !dataRobot
  });

  const handleOnChange = (value: string) => {
    setInputVolume(value);
  };

  const [ subscribeSend, { loading: subscribeLoading } ] = useMutation(SUBSCRIBE_TO_SIGNALS);
  const [ subscribe ] = useMutation(SUBSCRIBE);

  const exchange = useMemo(() => ((!loading && data && data.markets.length) ?
    data.markets[0] : { limits: { amount: { min: 0, max: 0 } } }
  ), [ loading, data ]);

  const handleOnSubmit = () => {
    subscribeSend({ variables: {
      robotId: dataRobot.robot.id,
      volume: Number(inputVolume)
    } })
      .then(response => {
        if (response.data.userSignalSusbcribe.success) {
          subscribe({
            variables: {
              cache: dataRobot.robot.cache,
              volume: Number(inputVolume),
              type,
              chartData: dataRobot.ChartData,
              name: searchName
            }
          });
        } else {
          setFormError(response.data.userSignalSusbcribe.error);
        }
        onClose();
      });
  };

  const { min, max } = exchange.limits.amount;
  const isValid = () => (Number(inputVolume) >= min && Number(inputVolume) <= max);

  const handleOnKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && isValid) {
      handleOnSubmit();
    }
  };

  return (
    <>
      {loading || subscribeLoading || !dataRobot ? (
        <LoadingIndicator />
      ) : (
        <>
          <ErrorLine formError={formError} />
          <div className={styles_subs.container}>
            <div className={styles.bodyTitle}>
              Please enter desired trading volume in&nbsp;
              <div style={{ color: 'white' }}>{dataRobot ? dataRobot.robot.subs.asset : ''}</div>
            </div>
            <div className={styles_subs.form}>
              <div className={[ styles.bodyText, styles_subs.formComment ].join(' ')}>
                <div className={styles_subs.label}>
                  Minimum value is
                </div>
                &nbsp;{moneyFormat(min, 3)}
              </div>
              <div className={styles_subs.fieldset}>
                <Input
                  type='number'
                  value={`${inputVolume}`}
                  onChangeText={value => handleOnChange(value)}
                />
                {/* <Input
                  className={responsive.input(!isValid())}
                  keyboardType='numeric'
                  value={`${inputVolume}`}
                  selectTextOnFocus
                  onChangeText={value => handleOnChange(value)}
                  onKeyPress={handleOnKeyPress}
                /> */}
                <div className={styles_subs.btns}>
                  <Button
                    className={styles.btn}
                    title={type === 'edit' ? 'Change' : 'Subscribe'}
                    icon='check'
                    type='success'
                    disabled={!isValid()}
                    isUppercase
                    onClick={handleOnSubmit} />
                  <Button
                    className={styles.btn}
                    title='Cancel'
                    icon='close'
                    type='dimmed'
                    isUppercase
                    onClick={onClose} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const SubscribeModal = memo(_SubscribeModal);
