import React, { memo } from 'react';

import { Button } from '../../../basic';
import { ModalKey } from './types';
import styles from './ExchangeKeysAddKey.module.css';

interface Props {
  handleSetVisibleModal: (key: ModalKey) => void;
}

const _ExchangeKeysAddKey: React.FC<Props> = ({ handleSetVisibleModal }) => {
  const handleOnPress = () => {
    handleSetVisibleModal(ModalKey.addKey);
  };

  return (
    <div className={styles.itemContainerCard}>
      <div
        className={styles.border}
        onClick={handleOnPress}
      >
        <Button
          title='Add New Key'
          icon='plus'
          isUppercase
        />
      </div>
    </div>
  );
};

export const ExchangeKeysAddKey = memo(_ExchangeKeysAddKey);
