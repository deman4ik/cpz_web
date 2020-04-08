/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useState, useEffect, useMemo, memo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ROBOT } from '../../../graphql/local/queries';
import { GET_MARKETS } from '../../../graphql/common/queries';
import { SUBSCRIBE_TO_SIGNALS } from '../../../graphql/signals/mutations';
import { SUBSCRIBE } from '../../../graphql/local/mutations';
import { Button } from '../../basic';
import { moneyFormat } from '../../../services/Utils';
import { color } from '../../../styles/vars';
import { styles } from '../../basic/Modal/index.style';
import { ErrorLine } from '../Common/ErrorLine';

interface Props {
  type?: string;
  setTitle: (title: string) => void;
  searchName?: string;
  onDismiss: () => void;
}

const _SubscribeModal: React.FC<Props> = ({ type, setTitle, onDismiss, searchName }) => {
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
        onDismiss();
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
        <ActivityIndicator size='large' color={color.accent} />
      ) : (
        <>
          <ErrorLine formError={formError} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.bodyTitle}>
              {t('Please enter desired trading volume in')}&nbsp;
              <Text style={{ color: color.white }}>{dataRobot ? dataRobot.robot.subs.asset : ''}</Text>
            </Text>
            <View style={_styles.form}>
              <Text style={[ styles.bodyText, _styles.formComment ]}>
                <Text style={_styles.label}>
                  {t('Minimum value is')}
                </Text>
                &nbsp;{moneyFormat(min, 3)}
              </Text>
              <View style={_styles.fieldset}>
                <TextInput
                  style={responsive.input(!isValid())}
                  keyboardType='numeric'
                  value={`${inputVolume}`}
                  selectTextOnFocus
                  onChangeText={value => handleOnChange(value)}
                  onKeyPress={handleOnKeyPress}
                />
                <View style={_styles.btns}>
                  <Button
                    style={styles.btn}
                    title={type === 'edit' ? t('Change') : t('Subscribe')}
                    icon='check'
                    type='success'
                    disabled={!isValid()}
                    isUppercase
                    onPress={handleOnSubmit}
                  />
                  <Button
                    style={styles.btn}
                    title={t('Cancel')}
                    icon='close'
                    type='dimmed'
                    isUppercase
                    onPress={onDismiss}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export const SubscribeModal = memo(_SubscribeModal);
