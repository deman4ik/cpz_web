import React, { memo } from "react";

import { CaptionButton } from "../../../basic";
import { ModalKey } from "./types";
import styles from "./ExchangeKeysAddKey.module.css";

interface Props {
    handleSetVisibleModal: (key: ModalKey) => void;
}

const _ExchangeKeysAddKey: React.FC<Props> = ({ handleSetVisibleModal }) => {
    const handleOnPress = () => {
        handleSetVisibleModal(ModalKey.addKey);
    };

    return (
        <div className={styles.itemContainerCard}>
            <div className={styles.border} onClick={handleOnPress}>
                <CaptionButton title="Add New Key" responsive={false} icon="plus" />
            </div>
        </div>
    );
};

export const ExchangeKeysAddKey = memo(_ExchangeKeysAddKey);
