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
import { getLimits, calculateCurrency, calculateAsset } from './helpers';
import styles from './index.module.css';
import styles_subs from './SubscribeModal.module.css';

interface Props {
  type?: string;
  setTitle: (title: string) => void;
  onClose: () => void;
}

const _SubscribeModal: React.FC<Props> = ({ type, setTitle, onClose }) => {
  const [ formError, setFormError ] = useState('');
  const { data: dataRobot } = useQuery(ROBOT);
  const [ inputVolumeAsset, setInputVolumeAsset ] = useState('0');
  const [ inputVolumeCurrency, setInputVolumeCurrency ] = useState('0');

  const { data, loading } = useQuery(GET_MARKETS, {
    variables: {
      exchange: !dataRobot ? null : dataRobot.robot.subs.exchange,
      asset: !dataRobot ? null : dataRobot.robot.subs.asset,
      currency: !dataRobot ? null : dataRobot.robot.subs.currency
    },
    skip: !dataRobot
  });

  const [ subscribeSend, { loading: subscribeLoading } ] = useMutation(SUBSCRIBE_TO_SIGNALS);
  const [ subscribe ] = useMutation(SUBSCRIBE);

  const limits = useMemo(() => ((!loading && data) ?
    getLimits(data) : { asset: { min: 0, max: 0 }, price: 0 }
  ), [ loading, data ]);

  const handleOnChangeAsset = (value: string) => {
    setInputVolumeAsset(value);
    setInputVolumeCurrency(calculateCurrency(value, limits.price));
  };

  const handleOnChangeCurrency = (value: string) => {
    setInputVolumeCurrency(value);
    setInputVolumeAsset(calculateAsset(value, limits.price));
  };

  useEffect(() => {
    if (dataRobot) {
      setInputVolumeAsset(dataRobot.robot.subs.volume);
      setInputVolumeCurrency(calculateCurrency(dataRobot.robot.subs.volume, limits.price));
      setTitle(dataRobot.robot.subs.volume ?
        `Following ${dataRobot.robot.name}` :
        `Subscribing to ${dataRobot.robot.name} signals`);
    }
  }, [ dataRobot ]);

  const handleOnSubmit = () => {
    subscribeSend({ variables: {
      robotId: dataRobot.robot.id,
      volume: Number(inputVolumeAsset)
    } })
      .then(response => {
        if (response.data.userSignalSusbcribe.success) {
          subscribe({
            variables: {
              cache: dataRobot.robot.cache,
              volume: Number(inputVolumeAsset),
              type,
              chartData: dataRobot.ChartData
            }
          });
        } else {
          setFormError(response.data.userSignalSusbcribe.error);
        }
        onClose();
      });
  };

  const isValid = () => (Number(inputVolumeAsset) >= limits.asset.min && Number(inputVolumeAsset) <= limits.asset.max);

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter' && isValid()) {
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
              Please enter desired trading volume
            </div>
            <div className={styles_subs.form}>
              <div className={[ styles.bodyText, styles_subs.formComment ].join(' ')}>
                <div className={styles_subs.label}>
                  Minimum value is&nbsp;
                </div>
                <span>{moneyFormat(limits.asset.min, 3)}</span>&nbsp;
                <span style={{ color: 'white' }}>{dataRobot ? dataRobot.robot.subs.asset : ''}</span>
                &nbsp;≈&nbsp;{calculateCurrency(limits.asset.min.toString(), limits.price)}&nbsp;$
              </div>
              <div className={styles_subs.fieldset}>
                <div className={styles_subs.input_group}>
                  <div className={styles_subs.volume}>
                    <Input
                      type='number'
                      value={`${inputVolumeAsset}`}
                      width={150}
                      error={!isValid()}
                      onKeyPress={handleOnKeyPress}
                      onChangeText={value => handleOnChangeAsset(value)} />
                    <span className={styles_subs.volume_text}>BTC</span>
                  </div>
                  <span className={styles_subs.delimiter} style={{ marginTop: 3 }}>≈</span>
                  <div className={styles_subs.volume} style={{ marginTop: 3 }}>
                    <Input
                      type='number'
                      value={`${inputVolumeCurrency}`}
                      width={150}
                      onKeyPress={handleOnKeyPress}
                      onChangeText={value => handleOnChangeCurrency(value)} />
                    <span className={styles_subs.volume_text}>$</span>
                  </div>
                </div>
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
