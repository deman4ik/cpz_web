import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";
import { RobotsType } from "config/types";

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
            <SubscribeModal
                type={RobotsType.signals}
                isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
                title={titleModal}
                onClose={handleClose}
                setTitle={setTitleModal}
                actionType={dataModal.ModalVisible.type}
            />
            <Modal
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}
                title={titleModal}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={handleClose} />
            </Modal>
        </>
    );
};
