import React, { useState } from "react";

import { ExchangeKeysAddKey } from "./ExchangeKeysAddKey";
import { ExchangeKeysAddKeyModal } from "./ExchangeKeysAddKeyModal";
import { ExchangeKeysEditNameModal } from "./ExchangeKeysEditNameModal";
import { ExchangeKeysDeleteKeyModal } from "./ExchangeKeysDeleteKeyModal";
import { ExchangeKeysCard } from "./ExchangeKeysCard";
import { ModalKey } from "./types";
import styles from "./ExchangeKeysContainer.module.css";
import { Modal } from "components/basic";

interface Props {
    formatData: any;
    refetch: () => void;
}

export const ExchangeKeysContainer: React.FC<Props> = ({ formatData, refetch }) => {
    const [isVisibleModal, setIsVisibleModal] = useState({
        addKey: {
            isVisible: false,
            options: null
        },
        deleteKey: {
            isVisible: false,
            options: null
        },
        editName: {
            isVisible: false,
            options: null
        }
    });

    const handleSetVisibleModal = (key: ModalKey, formOptions?: any) => {
        setIsVisibleModal((prev) => ({
            ...prev,
            [ModalKey[key]]: { isVisible: !prev[ModalKey[key]].isVisible, options: formOptions || null }
        }));
        refetch();
    };

    const handleSetVisibleModalDeleteKey = () => {
        handleSetVisibleModal(ModalKey.deleteKey);
    };

    const handleSetVisibleModalEditName = () => {
        handleSetVisibleModal(ModalKey.editName);
    };

    const handleSetVisibleModalAddKey = () => {
        handleSetVisibleModal(ModalKey.addKey);
    };

    const getSettings = (key: ModalKey) => {
        const keyName = ModalKey[key];
        const name = isVisibleModal[keyName].options ? isVisibleModal[keyName].options.name : "";
        const settings = {
            addKey: (options) => ({
                title: options ? `Edit ${name} Exchange API Keys` : "Add new Exchange API Keys",
                displayGuide: !options
            }),
            editName: (options) => ({ title: options ? `Rename ${name} Exchange API Keys` : "" }),
            deleteKey: (options) => ({ title: options ? `Delete ${name} Exchange API Keys?` : "" })
        };
        return settings[keyName](isVisibleModal[keyName].options);
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.containerCard}>
                    {formatData.map((item) => (
                        <ExchangeKeysCard key={item.id} item={item} handleSetVisibleModal={handleSetVisibleModal} />
                    ))}
                    <ExchangeKeysAddKey handleSetVisibleModal={handleSetVisibleModal} />
                </div>
            </div>
            <Modal
                title={getSettings(ModalKey.addKey).title}
                isOpen={isVisibleModal.addKey.isVisible}
                onClose={handleSetVisibleModalAddKey}>
                <ExchangeKeysAddKeyModal
                    displayGuide={getSettings(ModalKey.addKey).displayGuide}
                    options={isVisibleModal.addKey.options}
                    isExchangeDisabled={!!isVisibleModal.addKey.options}
                    onClose={handleSetVisibleModalAddKey}
                />
            </Modal>
            <Modal
                title={getSettings(ModalKey.editName).title}
                isOpen={isVisibleModal.editName.isVisible}
                onClose={handleSetVisibleModalEditName}>
                <ExchangeKeysEditNameModal
                    onClose={handleSetVisibleModalEditName}
                    options={isVisibleModal.editName.options}
                />
            </Modal>
            <Modal
                title={getSettings(ModalKey.deleteKey).title}
                isOpen={isVisibleModal.deleteKey.isVisible}
                onClose={handleSetVisibleModalDeleteKey}>
                <ExchangeKeysDeleteKeyModal
                    options={isVisibleModal.deleteKey.options}
                    onClose={handleSetVisibleModalDeleteKey}
                />
            </Modal>
        </>
    );
};
