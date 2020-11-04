import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { Modal } from "components/basic";
import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";

interface ModalsProps {
    afterClose?: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ afterClose }) => {
    const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();

    const onClose = (needsRefreshing?: boolean) => {
        handleSetVisible();
        if (needsRefreshing) {
            afterClose();
        }
    };
    return (
        <>
            <Modal
                title={titleModal}
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={onClose} />
            </Modal>
            <SubscribeModal
                isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
                title={titleModal}
                onClose={onClose}
                type={dataModal.ModalVisible.type}
                setTitle={setTitleModal}
            />
        </>
    );
};
