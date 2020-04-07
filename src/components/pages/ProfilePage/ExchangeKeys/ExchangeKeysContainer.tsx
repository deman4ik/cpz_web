import React, { useState } from 'react';

import { ExchangeKeysAddKey } from './ExchangeKeysAddKey';
// import { ExchangeKeysAddKeyModal } from './ExchangeKeysAddKeyModal';
// import { ExchangeKeysEditNameModal } from './ExchangeKeysEditNameModal';
// import { ExchangeKeysDeleteKeyModal } from './ExchangeKeysDeleteKeyModal';
import { ExchangeKeysCard } from './ExchangeKeysCard';
import { ModalKey } from './types';
import styles from './ExchangeKeysContainer.module.css';
//import { Modal } from '../../../basic';

interface Props {
  formatData: any;
}

export const ExchangeKeysContainer: React.FC<Props> = ({ formatData }) => {
  const [ isVisibleModal, setIsVisibleModal ] = useState({
    addKey: {
      isVisible: false,
      options: null
    },
    deleteKey: {
      isVisible: false,
      options: null
    },
    editName: {
      isVisible: false,
      options: null
    }
  });

  const handleSetVisibleModal = (key: ModalKey, formOptions?: any) => {
    setIsVisibleModal(prev =>
      ({ ...prev, [ModalKey[key]]: { isVisible: !prev[ModalKey[key]].isVisible, options: formOptions || null } }));
  };

  const handleSetVisibleModalDeleteKey = () => {
    handleSetVisibleModal(ModalKey.deleteKey);
  };

  const handleSetVisibleModalEditName = () => {
    handleSetVisibleModal(ModalKey.editName);
  };

  const handleSetVisibleModalAddKey = () => {
    handleSetVisibleModal(ModalKey.addKey);
  };

  const getTitle = (key: ModalKey) => {
    const keyName = ModalKey[key];
    const name = isVisibleModal[keyName].options ? isVisibleModal[keyName].options.name : '';
    const title = {
      addKey: options => (options ? `Edit ${name} Exchange API Keys` : 'Add new Exchange API Keys'),
      editName: options => (options ? `Rename ${name} Exchange API Keys` : ''),
      deleteKey: options => (options ? `Delete ${name} Exchange API Keys?` : '')
    };
    return title[keyName](isVisibleModal[keyName].options);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerCard}>
          { formatData.map((item) => (
            <ExchangeKeysCard
              key={item.id}
              item={item}
              handleSetVisibleModal={handleSetVisibleModal} />
          )) }
          <ExchangeKeysAddKey handleSetVisibleModal={handleSetVisibleModal} />
        </div>
      </div>
      {/* <Modal
        screenType={dimension.screenType}
        title={getTitle(ModalKey.addKey)}
        visible={isVisibleModal.addKey.isVisible}
        onDismiss={handleSetVisibleModalAddKey}
      >
        <ExchangeKeysAddKeyModal
          dimension={dimension}
          options={isVisibleModal.addKey.options}
          isExchangeDisabled={!!isVisibleModal.addKey.options}
          onDismiss={handleSetVisibleModalAddKey}
        />
      </Modal>
      <Modal
        screenType={dimension.screenType}
        title={getTitle(ModalKey.editName)}
        visible={isVisibleModal.editName.isVisible}
        onDismiss={handleSetVisibleModalEditName}
      >
        <ExchangeKeysEditNameModal
          onDismiss={handleSetVisibleModalEditName}
          options={isVisibleModal.editName.options} />
      </Modal>
      <Modal
        screenType={dimension.screenType}
        title={getTitle(ModalKey.deleteKey)}
        visible={isVisibleModal.deleteKey.isVisible}
        onDismiss={handleSetVisibleModalDeleteKey}
      >
        <ExchangeKeysDeleteKeyModal
          options={isVisibleModal.deleteKey.options}
          onDismiss={handleSetVisibleModalDeleteKey} />
      </Modal> */}
    </>
  );
};
