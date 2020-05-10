import { modalType } from './types';

const actions = [ "delete", 'start', 'stop'];

export const getIsVisibleStatus = (
  modal: modalType,
  dataModal: { ModalVisible: { isVisible: boolean; type: string } }
) => {
  const modalOpen = {
    create: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === 'create',
    action: () => dataModal.ModalVisible.isVisible && actions.includes(dataModal.ModalVisible.type),
    edit: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === 'edit',
    subscribe: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type !== 'unsubscribe',
    unsubscribe: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === 'unsubscribe'
  };

  return modalOpen[modalType[modal]]();
};
