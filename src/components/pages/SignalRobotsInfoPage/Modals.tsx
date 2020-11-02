import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

export const Modals: React.FC<{ afterClose: () => void }> = ({ afterClose }) => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    const handleClose = (needsRefreshing: boolean) => {
        handleSetVisible();
        if (needsRefreshing) {
            afterClose();
        }
    };
    return (
        <>
            <Modal
                onClose={handleSetVisible}
                isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
                title={titleModal}>
                <SubscribeModal onClose={handleClose} setTitle={setTitleModal} type={dataModal.ModalVisible.type} />
            </Modal>
            <Modal
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}
                title={titleModal}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={handleClose} />
            </Modal>
        </>
    );
};
