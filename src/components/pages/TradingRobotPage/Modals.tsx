import React, { memo, useState } from "react";

import { EditRobotModal, CreateRobotModal, ActionRobotModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { VisibleModal } from "./types";

interface Props {
    isModalVisible: VisibleModal;
    setModalVisibility: (isModalVisible: VisibleModal) => void;
    width: number;
    code: string;
}

const actions = ["start", "stop", "delete"];
const _Modals: React.FC<Props> = ({ isModalVisible, width, setModalVisibility, code }) => {
    const [titleModal, setTitleModal] = useState(null);
    const handleSetVisible = () => {
        setModalVisibility({ isVisible: false, type: "" });
    };
    return (
        <>
            <EditRobotModal
                isOpen={isModalVisible.isVisible && isModalVisible.type === "edit"}
                onClose={handleSetVisible}
                title={titleModal}
                setTitle={setTitleModal}
                code={code}
            />
            <Modal
                isOpen={isModalVisible.isVisible && isModalVisible.type === "create"}
                onClose={handleSetVisible}
                title="Add Trading Robot">
                <CreateRobotModal onClose={handleSetVisible} code={code} width={width} />
            </Modal>
            <Modal
                isOpen={isModalVisible.isVisible && actions.includes(isModalVisible.type)}
                onClose={handleSetVisible}
                title={titleModal}>
                <ActionRobotModal type={isModalVisible.type} setTitle={setTitleModal} onClose={handleSetVisible} />
            </Modal>
        </>
    );
};

export const Modals = memo(_Modals);
