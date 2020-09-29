import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { Modal } from "components//basic";
import { ActionRobotModal, EditRobotModal, CreateRobotModal } from "components//ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

interface Props {
    width: number;
}

export const Modals: React.FC<Props> = ({ width }) => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    return (
        <>
            <Modal
                isOpen={getIsVisibleStatus(modalType.create, dataModal)}
                onClose={handleSetVisible}
                title="Add Trading Robot">
                <CreateRobotModal onClose={handleSetVisible} width={width} />
            </Modal>
            <Modal
                isOpen={getIsVisibleStatus(modalType.action, dataModal)}
                onClose={handleSetVisible}
                title={titleModal}>
                <ActionRobotModal
                    setTitle={setTitleModal}
                    onClose={handleSetVisible}
                    type={dataModal.ModalVisible.type}
                />
            </Modal>
            <Modal isOpen={getIsVisibleStatus(modalType.edit, dataModal)} onClose={handleSetVisible} title={titleModal}>
                <EditRobotModal onClose={handleSetVisible} setTitle={setTitleModal} />
            </Modal>
        </>
    );
};
