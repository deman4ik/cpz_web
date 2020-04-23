/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo, useEffect } from 'react';

import { exchangeName } from '../../../../config/utils';
import { Button, Select } from '../../../basic';
import { ExchangeKeysAddKeyModal } from '../../../pages/ProfilePage/ExchangeKeys/ExchangeKeysAddKeyModal';
import styles from '../index.module.css';

interface Props {
  dataPicker: any; // Todo any
  exchange?: string;
  selectedKey: string;
  refetchQueries: any; // Todo any
  hasError?: boolean;
  handleOnNext: () => void;
  handleOnChangeExchange: (value: string) => void;
  setFormError: (error: string) => void;
  onClose: () => void;
}

const _CreateRobotStep1: React.FC<Props> = ({
  exchange, selectedKey, hasError, dataPicker, refetchQueries, handleOnNext,
  handleOnChangeExchange, setFormError, onClose }) => {
  const [ newName, setNewName ] = useState('');
  const [ isAddKeyVisible, setIsAddKeyVisible ] = useState(!dataPicker.length);

  const handleOnAddKey = () => {
    if (isAddKeyVisible) {
      handleOnChangeExchange(selectedKey);
    } else {
      setFormError('');
    }

    setIsAddKeyVisible(!isAddKeyVisible);
  };

  const handleOnSubmit = (name: string) => {
    setIsAddKeyVisible(false);
    setNewName(name);
  };

  useEffect(() => {
    if (newName) {
      handleOnChangeExchange(dataPicker.find(item => item.label === newName).id);
      setNewName('');
    } else if (dataPicker[0]) {
      handleOnChangeExchange(dataPicker[0].id);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        {dataPicker.length ? (
          <div className={styles.selectGroup}>
            <div className={styles.select}>
              <Select
                data={dataPicker}
                value={selectedKey}
                enabled={!isAddKeyVisible}
                onValueChange={value => handleOnChangeExchange(value)} />
            </div>
            <Button
              className={styles.btnSelectGroup}
              title='Add New API Key'
              icon='plus'
              type='dimmed'
              isUppercase
              onClick={handleOnAddKey} />
          </div>
        ) : (
          <div className={styles.noKeysText}>
            Exchange API Keys for {exchangeName(exchange)} not found.{'\n'}
            Please create new API Keys.
          </div>
        )}
        {isAddKeyVisible ? (
          <ExchangeKeysAddKeyModal
            exchange={exchange}
            refetchQueries={refetchQueries}
            isExchangeDisabled
            onClose={onClose}
            handleOnSubmit={handleOnSubmit}
          />
        ) : (
          <>
            <div className={styles.btns}>
              <Button
                className={styles.btn}
                title='Cancel'
                icon='close'
                type='dimmed'
                isUppercase
                onClick={onClose} />
              <Button
                className={styles.btn}
                title='Next'
                icon='chevronright'
                type='success'
                disabled={hasError || !selectedKey}
                isUppercase
                onClick={handleOnNext} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const CreateRobotStep1 = memo(_CreateRobotStep1);
