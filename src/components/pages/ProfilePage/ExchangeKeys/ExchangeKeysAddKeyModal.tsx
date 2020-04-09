/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_EXCHANGES, GET_USER_EXCHANGES } from '../../../../graphql/profile/queries';
import { GET_USER_ROBOTS_BY_EXCHANGE_ID } from '../../../../graphql/robots/queries';
import { UPDATE_EXCHANGE_KEY } from '../../../../graphql/profile/mutations';
import { Button, Select } from '../../../basic';
import { AddKey } from './types';
import { color } from '../../../../styles/vars';

interface Props {
  options?: AddKey;
  exchange?: string;
  refetchQueries?: any; // Todo any
  isExchangeDisabled?: boolean;
  onDismiss?: () => void;
  handleOnSubmit?: (key: string) => void;
}

const _ExchangeKeysAddKeyModal: React.FC<Props> = ({
  options,
  exchange,
  refetchQueries,
  isExchangeDisabled,
  onDismiss,
  handleOnSubmit
}) => {
  const [ inputName, setInputName ] = useState(options ? options.name : '');
  const [ inputExchange, setInputExchange ] = useState(
    options ? options.exchange : exchange
  );
  const [ responseError, setResponseError ] = useState({ error: false, msg: '' });
  const [ isFetchResponse, setIsFetchResponse ] = useState(false);
  const [ disabledEdit, setDisabledEdit ] = useState(false);
  const [ inputKeys, setInputKeys ] = useState({ public: '', secret: '' });
  const [ dataPicker, setDataPicker ] = useState([]);
  const { data, loading } = useQuery(GET_EXCHANGES);

  const [ addKey ] = useMutation(UPDATE_EXCHANGE_KEY, {
    variables: {
      name: inputName || null,
      exchange: inputExchange,
      keys: { key: inputKeys.public, secret: inputKeys.secret },
      id: options ? options.id : ''
    },
    refetchQueries: [ ...(refetchQueries || []), { query: GET_USER_EXCHANGES } ]
  });

  const { data: dataCheck, loading: loadingCheck } = useQuery(
    GET_USER_ROBOTS_BY_EXCHANGE_ID,
    {
      variables: {
        user_ex_acc_id: options ? options.id : null
      }
    }
  );
  const handleOnChangeName = (value: string) => {
    setInputName(value);
  };

  const handleOnChangeExchange = (value: string) => {
    setInputExchange(value);
  };

  const handleOnChangeKeys = (text: string, key: string) => {
    setInputKeys(prev => ({ ...prev, [key]: text }));
  };

  const handleOnPress = () => {
    if (!inputKeys.public.trim().length || !inputKeys.secret.trim().length) {
      setResponseError({
        error: true,
        msg: 'Public and Private API Keys are required'
      });
      return;
    }
    if (inputName.length > 50) {
      setResponseError({ error: true, msg: 'Too long name. Max 50' });
      return;
    }
    setIsFetchResponse(true);
    addKey().then(response => {
      setIsFetchResponse(false);
      if (response.data.userExchangeAccUpsert.success) {
        setResponseError({ error: false, msg: '' });
        if (handleOnSubmit) {
          handleOnSubmit(response.data.userExchangeAccUpsert.result);
        } else {
          onDismiss();
        }
      } else {
        setResponseError({
          error: true,
          msg: response.data.userExchangeAccUpsert.error
        });
      }
    });
  };

  useEffect(() => {
    if (!loading) {
      setDataPicker(data.exchanges.map(item => ({
        label: item.name,
        value: item.code
      })));
    }
  }, [ data ]);

  useEffect(() => {
    if (!loadingCheck && options) {
      const checkElements = [ 'stopped', 'paused' ];
      setDisabledEdit(
        dataCheck.user_robots.some(el => checkElements.includes(el.status))
      );
    }
  }, [ loadingCheck, dataCheck ]);

  return (
    <>
      {responseError.error && (
        <View
          style={[
            common.errorContainer,
            !!handleOnSubmit && { marginTop: 0 }
          ]}>
          <Text style={common.errorText}>{responseError.msg}</Text>
        </View>
      )}
      <View style={styles.container}>
        <View>
          <Text style={common.tableCellText}>My Exchange API Key Name</Text>
          <TextInput
            value={inputName}
            style={[ styles.inputName, { marginTop: 6 } ]}
            selectTextOnFocus
            editable={!options}
            onChangeText={value => handleOnChangeName(value)}
          />
        </View>
        <View>
          <Text style={common.tableCellText}>Exchange</Text>
          <Select
            enabled={!isExchangeDisabled}
            selectedValue={inputExchange}
            data={dataPicker}
            style={{ marginTop: 6 }}
            dimension={dimension}
            onValueChange={itemValue => handleOnChangeExchange(itemValue)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}>
          <View style={{ marginHorizontal: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={common.tableCellText}>
                API Key (Public Key)&nbsp;
              </Text>
              <Text style={[ common.tableCellText, { color: color.negative } ]}>
                *
              </Text>
            </View>
            <TextInput
              value={inputKeys.public}
              style={[
                responsive.inputKey(responseError.error),
                { marginTop: 6 }
              ]}
              selectTextOnFocus
              multiline
              numberOfLines={4}
              scrollEnabled={false}
              onChangeText={text => handleOnChangeKeys(text, 'public')}
            />
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={common.tableCellText}>
                API Secret (Private Key)&nbsp;
              </Text>
              <Text style={[ common.tableCellText, { color: color.negative } ]}>
                *
              </Text>
            </View>
            <TextInput
              value={inputKeys.secret}
              style={[
                responsive.inputKey(responseError.error),
                { marginTop: 6 }
              ]}
              selectTextOnFocus
              multiline
              numberOfLines={4}
              scrollEnabled={false}
              onChangeText={text => handleOnChangeKeys(text, 'secret')}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            type='success'
            width={125}
            title={options ? 'edit key' : 'add key'}
            onClick={handleOnPress}
            isLoading={isFetchResponse}
            disabled={disabledEdit}
            icon='check'
            isUppercase
          />
          <Button
            type='dimmed'
            width={125}
            title='cancel'
            style={{ marginLeft: 15 }}
            onClick={onDismiss}
            icon='close'
            isUppercase
          />
        </View>
      </View>
    </>
  );
};

export const ExchangeKeysAddKeyModal = memo(_ExchangeKeysAddKeyModal);
