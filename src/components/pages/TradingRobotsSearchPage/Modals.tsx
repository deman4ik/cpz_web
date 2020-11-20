import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { Modal } from "components//basic";
import { ActionRobotModal, EditRobotModal, CreateRobotModal } from "components//ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

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
    return (
        <>
            <Modal
                isOpen={getIsVisibleStatus(modalType.create, dataModal)}
                onClose={() => handleClose(true)}
                title="Add Trading Robot">
                <CreateRobotModal onClose={handleClose} width={width} />
            </Modal>
            <Modal
                isOpen={getIsVisibleStatus(modalType.action, dataModal)}
                onClose={handleSetVisible}
                title={titleModal}>
                <ActionRobotModal setTitle={setTitleModal} onClose={handleClose} type={dataModal.ModalVisible.type} />
            </Modal>
            <EditRobotModal
                type={type}
                isOpen={getIsVisibleStatus(modalType.edit, dataModal)}
                onClose={handleClose}
                title={titleModal}
                setTitle={setTitleModal}
            />
        </>
    );
};
