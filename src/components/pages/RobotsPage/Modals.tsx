import React from "react";

import { useVisibleModal } from "../../../hooks/useVisibleModal";
import { ActionRobotModal, EditRobotModal } from "../../ui/Modals";
import { Modal } from "../../basic";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

export const Modals: React.FC = () => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    return (
        <>
            <Modal
                onClose={handleSetVisible}
                isOpen={getIsVisibleStatus(modalType.action, dataModal)}
                title={titleModal}>
                <ActionRobotModal
                    onClose={handleSetVisible}
                    setTitle={setTitleModal}
                    type={dataModal.ModalVisible.type}
                />
            </Modal>
            <Modal isOpen={getIsVisibleStatus(modalType.edit, dataModal)} onClose={handleSetVisible} title={titleModal}>
                <EditRobotModal setTitle={setTitleModal} onClose={handleSetVisible} />
            </Modal>
        </>
    );
};
