import React, { memo, useState } from "react";

import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { VisibleModal } from "../types";

interface Props {
    isModalVisible: VisibleModal;
    setModalVisibility: (isModalVisible: VisibleModal) => void;
    afterClose: () => void;
}

const _Modals: React.FC<Props> = ({ isModalVisible, setModalVisibility, afterClose }) => {
    const [modalTitle, setModalTitle] = useState(null);
    const isSubscribeModal = isModalVisible.isVisible && isModalVisible.type !== "unsubscribe";
    const isUnsubscribeModal = isModalVisible.isVisible && isModalVisible.type !== "subscribe";

    const resetModal = () => {
        setModalVisibility({ isVisible: false, type: "" });
    };

    const handleClose = (needsRefreshing: boolean) => {
        resetModal();
        if (needsRefreshing) {
            afterClose();
        }
    };

    return (
        <>
            <SubscribeModal
                isOpen={isSubscribeModal}
                title={modalTitle}
                onClose={handleClose}
                setTitle={setModalTitle}
                actionType={isModalVisible.type}
            />
            <Modal isOpen={isUnsubscribeModal} onClose={resetModal} title={modalTitle}>
                <UnsubscribeModal setTitle={setModalTitle} onClose={handleClose} />
            </Modal>
        </>
    );
};

export const Modals = memo(_Modals);