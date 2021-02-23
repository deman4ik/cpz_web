import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { Modal } from "components/basic";
import { ActionRobotModal, EditRobotModal, CreateRobotModal, UnsubscribeModal } from "components//ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";
import { RobotsType } from "config/types";

interface Props {
    width: number;
    type: string;
    afterClose?: () => void;
}

export const Modals: React.FC<Props> = ({ width, afterClose, type }) => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    const handleClose = (needsRefreshing: boolean) => {
        if (needsRefreshing && afterClose) {
            afterClose();
        }
        handleSetVisible();
    };
    const subscribeModalOpen = getIsVisibleStatus(modalType.unsubscribe, dataModal);
    const createModalOpen = getIsVisibleStatus(modalType.create, dataModal);
    const actionModalOpen = getIsVisibleStatus(modalType.action, dataModal);
    const editModalOpen = getIsVisibleStatus(modalType.edit, dataModal);
    return (
        <>
            {type === RobotsType.signals && subscribeModalOpen && (
                <Modal title={titleModal} isOpen={subscribeModalOpen} onClose={handleSetVisible}>
                    <UnsubscribeModal setTitle={setTitleModal} onClose={handleClose} />
                </Modal>
            )}
            {createModalOpen && (
                <Modal isOpen={createModalOpen} onClose={() => handleClose(true)} title="Add Trading Robot">
                    <CreateRobotModal onClose={handleClose} width={width} />
                </Modal>
            )}
            {actionModalOpen && (
                <Modal isOpen={actionModalOpen} onClose={handleSetVisible} title={titleModal}>
                    <ActionRobotModal
                        setTitle={setTitleModal}
                        onClose={handleClose}
                        type={dataModal.ModalVisible.type}
                    />
                </Modal>
            )}
            {editModalOpen && (
                <EditRobotModal
                    type={type}
                    isOpen={editModalOpen}
                    onClose={handleClose}
                    title={titleModal}
                    setTitle={setTitleModal}
                />
            )}
        </>
    );
};
