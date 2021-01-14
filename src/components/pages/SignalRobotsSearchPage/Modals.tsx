import React from "react";

import { useVisibleModal } from "hooks/useVisibleModal";
import { Modal } from "components/basic";
import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { getIsVisibleStatus } from "../helpers";
import { modalType } from "../types";
import { RobotsType } from "config/types";

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
    const isSubscribeModalOpen = getIsVisibleStatus(modalType.subscribe, dataModal);
    return (
        <>
            <Modal
                title={titleModal}
                isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
                onClose={handleSetVisible}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={onClose} />
            </Modal>
            {isSubscribeModalOpen && (
                <SubscribeModal
                    type={RobotsType.signals}
                    isOpen={isSubscribeModalOpen}
                    title={titleModal}
                    onClose={onClose}
                    actionType={dataModal.ModalVisible.type}
                    setTitle={setTitleModal}
                />
            )}
        </>
    );
};
