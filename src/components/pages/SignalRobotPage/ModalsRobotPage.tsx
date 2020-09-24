import React, { memo, useState } from "react";

import { SubscribeModal, UnsubscribeModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { VisibleModal } from "./types";

interface Props {
    isModalVisible: VisibleModal;
    setModalVisibility: (isModalVisible: VisibleModal) => void;
}

const _ModalsRobotPage: React.FC<Props> = ({ isModalVisible, setModalVisibility }) => {
    const [titleModal, setTitleModal] = useState(null);
    const handleSetVisible = () => {
        setModalVisibility({ isVisible: false, type: "" });
    };

    return (
        <>
            <Modal
                isOpen={isModalVisible.isVisible && isModalVisible.type !== "unsubscribe"}
                onClose={handleSetVisible}
                title={titleModal}>
                <SubscribeModal onClose={handleSetVisible} setTitle={setTitleModal} type={isModalVisible.type} />
            </Modal>
            <Modal
                isOpen={isModalVisible.isVisible && isModalVisible.type === "unsubscribe"}
                onClose={handleSetVisible}
                title={titleModal}>
                <UnsubscribeModal setTitle={setTitleModal} onClose={handleSetVisible} />
            </Modal>
        </>
    );
};

export const ModalsRobotPage = memo(_ModalsRobotPage);
