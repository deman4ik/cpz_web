import React, { memo, useState } from 'react';

import { EditRobotModal, CreateRobotModal, ActionRobotModal } from '../../ui/Modals';
import { Modal } from '../../basic';
import { VisibleModal } from './types';

interface Props {
  visibleModal: VisibleModal;
  setVisibleModal: (visibleModal: VisibleModal) => void;
  width: number;
  code: string;
}

const actions = [ 'start', 'stop', 'delete' ];
const _ModalsRobotPage: React.FC<Props> = ({ visibleModal, width, setVisibleModal, code }) => {
  const [ titleModal, setTitleModal ] = useState(null);
  const handleSetVisible = () => {
    setVisibleModal({ isVisible: false, type: '' });
  };
  return (
    <>
      <Modal
        isOpen={visibleModal.isVisible && visibleModal.type === 'edit'}
        onClose={handleSetVisible}
        title={titleModal}
      >
        <EditRobotModal
          onClose={handleSetVisible}
          setTitle={setTitleModal}
          code={code} />
      </Modal>
      <Modal
        isOpen={visibleModal.isVisible && visibleModal.type === 'create'}
        onClose={handleSetVisible}
        title='Add Trading Robot'
      >
        <CreateRobotModal
          onClose={handleSetVisible}
          code={code}
          width={width} />
      </Modal>
      <Modal
        isOpen={visibleModal.isVisible && actions.includes(visibleModal.type)}
        onClose={handleSetVisible}
        title={titleModal}
      >
        <ActionRobotModal
          type={visibleModal.type}
          setTitle={setTitleModal}
          onClose={handleSetVisible} />
      </Modal>
    </>
  );
};

export const ModalsRobotPage = memo(_ModalsRobotPage);
