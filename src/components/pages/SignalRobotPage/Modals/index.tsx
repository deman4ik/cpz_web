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
                type={isModalVisible.type}
            />
            <Modal isOpen={!isSubscribeModal} onClose={resetModal} title={modalTitle}>
                <UnsubscribeModal setTitle={setModalTitle} onClose={handleClose} />
            </Modal>
        </>
    );
};

export const Modals = memo(_Modals);
