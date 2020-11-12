import React, { useState } from "react";
import { Modal } from "components/basic/Modal";
import styles from "../styles/ActionModal.module.css";
import { EffectButton } from "components/basic/EffectButton";

type Props = {
    columns: any;
    isOpen: boolean;
    toggle: () => void;
    selectedRows: any;
};

enum Steps {
    select = "Select a column to edit",
    input = "Enter new value for selected entries"
}

const ActionModal = ({ columns, isOpen, toggle, selectedRows }: Props): JSX.Element => {
    const [step, setStep] = useState(Steps.select);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [inputRemovalBlocked, setBlock] = useState(false);

    const handlePressItem = (column) => {
        setSelectedColumn(column);
        setStep(Steps.input);
    };

    const handlePressBack = () => {
        setBlock(true);
        setStep(Steps.select);
        setTimeout(() => setBlock(false), 300);
    };

    return (
        <Modal isOpen={isOpen} title={step} onClose={toggle}>
            <div className={styles.body}>
                <div className={`${styles.firstStepContainer} ${step === Steps.input ? styles.hidden : styles.shown}`}>
                    {columns.map((group, i) => (
                        <div key={i} className={styles.group}>
                            <h2 className={styles.groupHeader}>{group.Header}</h2>
                            <div className={styles.itemGroup}>
                                {group.columns.map((col, j) => (
                                    <div key={j} className={styles.itemContainer}>
                                        <span className={styles.item} onClick={() => handlePressItem(col)}>
                                            {col.Header}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {(step === Steps.input || inputRemovalBlocked) && (
                    <div className={styles.inputStep}>
                        <EffectButton icon="arrowleft" onClick={handlePressBack} />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ActionModal;
