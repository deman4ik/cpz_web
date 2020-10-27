import React, { memo, useState } from "react";

import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { VisibleModal } from "./types";

interface Props {
    isModalVisible: VisibleModal;
    setModalVisibility: (isModalVisible: VisibleModal) => void;
}

const _Modals: React.FC<Props> = ({ isModalVisible, setModalVisibility }) => {
    const [modalTitle, setModalTitle] = useState(null);
    const resetModal = () => {
        setModalVisibility({ isVisible: false, type: "" });
    };

    return (
        <>
            <Modal
                isOpen={isModalVisible.isVisible && isModalVisible.type !== "unsubscribe"}
                onClose={resetModal}
                title={modalTitle}>
                <SubscribeModal onClose={resetModal} setTitle={setModalTitle} type={isModalVisible.type} />
            </Modal>
            <Modal
                isOpen={isModalVisible.isVisible && isModalVisible.type === "unsubscribe"}
                onClose={resetModal}
                title={modalTitle}>
                <UnsubscribeModal setTitle={setModalTitle} onClose={resetModal} />
            </Modal>
        </>
    );
};

export const Modals = memo(_Modals);
