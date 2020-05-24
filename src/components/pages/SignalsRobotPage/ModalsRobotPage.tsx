import React, { memo, useState } from "react";

import { SubscribeModal, UnsubscribeModal } from "../../ui/Modals";
import { Modal } from "../../basic";
import { VisibleModal } from "./types";

interface Props {
    visibleModal: VisibleModal;
    setVisibleModal: (visibleModal: VisibleModal) => void;
}

const _ModalsRobotPage: React.FC<Props> = ({ visibleModal, setVisibleModal }) => {
    const [titleModal, setTitleModal] = useState(null);
    const handleSetVisible = () => {
        setVisibleModal({ isVisible: false, type: "" });
    };

    return (
        <>
            <Modal
                isOpen={visibleModal.isVisible && visibleModal.type !== "unsubscribe"}
                onClose={handleSetVisible}
                title={titleModal}>
                <SubscribeModal onClose={handleSetVisible} setTitle={setTitleModal} type={visibleModal.type} />
            </Modal>
            <Modal
                isOpen={visibleModal.isVisible && visibleModal.type === "unsubscribe"}
                onClose={handleSetVisible}
                title={titleModal}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={handleSetVisible} />
            </Modal>
        </>
    );
};

export const ModalsRobotPage = memo(_ModalsRobotPage);
