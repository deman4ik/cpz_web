import React from "react";

import { useVisibleModal } from "../../../hooks/useVisibleModal";
import { Modal } from "../../basic";
import { SubscribeModal, UnsubscribeModal } from "../../ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

export const Modals: React.FC = () => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    return (
        <>
            <Modal
                title={titleModal}
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={handleSetVisible} />
            </Modal>
            <Modal
                isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
                onClose={handleSetVisible}
                title={titleModal}>
                <SubscribeModal
                    onClose={handleSetVisible}
                    type={dataModal.ModalVisible.type}
                    setTitle={setTitleModal}
                />
            </Modal>
        </>
    );
};
