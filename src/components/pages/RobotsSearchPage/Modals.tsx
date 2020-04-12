import React from 'react';

import { useVisibleModal } from '../../../hooks/useVisibleModal';
import { Modal } from '../../basic';
import { ActionRobotModal, EditRobotModal, CreateRobotModal } from '../../ui/Modals';
import { getIsVisibleStatus } from '../helpers';
import { modalType } from '../types';

interface Props {
  searchText: string;
  width: number;
}

export const Modals: React.FC<Props> = ({ searchText, width }) => {
  const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

  return (
    <>
      <Modal
        isOpen={getIsVisibleStatus(modalType.create, dataModal)}
        onClose={handleSetVisible}
        title='Add Trading Robot'
      >
        <CreateRobotModal
          onClose={handleSetVisible}
          searchName={searchText}
          width={width} />
      </Modal>
      <Modal
        isOpen={getIsVisibleStatus(modalType.action, dataModal)}
        onClose={handleSetVisible}
        title={titleModal}
      >
        <ActionRobotModal
          setTitle={setTitleModal}
          onClose={handleSetVisible}
          type={dataModal.ModalVisible.type} />
      </Modal>
      <Modal
        isOpen={getIsVisibleStatus(modalType.edit, dataModal)}
        onClose={handleSetVisible}
        title={titleModal}
      >
        <EditRobotModal
          onClose={handleSetVisible}
          searchName={searchText}
          setTitle={setTitleModal} />
      </Modal>
    </>
  );
};
