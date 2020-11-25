import React, { memo, useState } from "react";

import { EditRobotModal, CreateRobotModal, ActionRobotModal } from "components/ui/Modals";
import { Modal } from "components/basic";
import { VisibleModal } from "./types";

interface Props {
    isModalVisible: VisibleModal;
    setModalVisibility: (isModalVisible: VisibleModal) => void;
    afterClose: () => void;
    width: number;
    code: string;
}

const actions = ["start", "stop", "delete"];
const _Modals: React.FC<Props> = ({ isModalVisible, width, setModalVisibility, code, afterClose }) => {
    const [titleModal, setTitleModal] = useState(null);
    const handleSetVisible = (needsRefreshing?: boolean) => {
        if (needsRefreshing) {
            afterClose();
        }
        setModalVisibility({ isVisible: false, type: "" });
    };
    const isVisible = (type) => isModalVisible.isVisible && isModalVisible.type === type;
    return (
        <>
            {isVisible("edit") && (
                <EditRobotModal
                    type="robots"
                    isOpen={isVisible("edit")}
                    onClose={handleSetVisible}
                    title={titleModal}
                    setTitle={setTitleModal}
                    code={code}
                />
            )}
            {isVisible("create") && (
                <Modal
                    isOpen={isModalVisible.isVisible && isModalVisible.type === "create"}
                    onClose={() => handleSetVisible()}
                    title="Add Trading Robot">
                    <CreateRobotModal onClose={handleSetVisible} code={code} width={width} />
                </Modal>
            )}
            {isModalVisible.isVisible && actions.includes(isModalVisible.type) && (
                <Modal
                    isOpen={isModalVisible.isVisible && actions.includes(isModalVisible.type)}
                    onClose={() => handleSetVisible()}
                    title={titleModal}>
                    <ActionRobotModal type={isModalVisible.type} setTitle={setTitleModal} onClose={handleSetVisible} />
                </Modal>
            )}
        </>
    );
};

export const Modals = memo(_Modals);
