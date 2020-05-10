import React from 'react';

import { useVisibleModal } from '../../../hooks/useVisibleModal';
import { SubscribeModal, UnsubscribeModal } from '../../ui/Modals';
import { Modal } from '../../basic';
import { getIsVisibleStatus } from '../helpers';
import { modalType } from '../types';

export const Modals: React.FC = () => {
  const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

  return (
      <>
      <Modal
              onClose={handleSetVisible}
              isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
              title={titleModal}>
              <SubscribeModal
                    onClose={handleSetVisible}
                    setTitle={setTitleModal}
              type={dataModal.ModalVisible.type}
                />
            </Modal>
            <Modal
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}
          title={titleModal}>
          <UnsubscribeModal setTitle={setTitleModal} onClose={handleSetVisible} />
        </Modal>
        </>
  );
};
