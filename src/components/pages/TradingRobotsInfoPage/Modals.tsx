import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { ActionRobotModal, EditRobotModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

export const Modals: React.FC = () => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible, afterClose } = useVisibleModal();

    const onClose = () => {
        handleSetVisible({ isVisible: false, type: "" });
    };
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
            <EditRobotModal
                type="robot"
                isOpen={getIsVisibleStatus(modalType.edit, dataModal)}
                onClose={onClose}
                title={titleModal}
                setTitle={setTitleModal}
            />
        </>
    );
};
