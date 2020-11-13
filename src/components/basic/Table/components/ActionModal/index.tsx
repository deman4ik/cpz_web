import React, { useState } from "react";
import { Modal } from "components/basic/Modal";
import styles from "./index.module.css";
import SecondStep from "./components/SecondStep";

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
    const [selectedColumn, setColumn] = useState(null);
    const [inputRemovalBlocked, setBlock] = useState(false);

    const handlePressItem = (column) => {
        setColumn(column);
        setStep(Steps.input);
    };

    const handlePressBack = () => {
        setBlock(true);
        setStep(Steps.select);
        setColumn(null);
        setTimeout(() => setBlock(false), 150);
    };

    return (
        <Modal isOpen={isOpen} title={step} onClose={toggle} style={{ width: 400 }}>
            <div className={styles.body}>
                <div
                    className={`${styles.container} ${styles.firstStepContainer} ${
                        step === Steps.input ? styles.hidden : styles.shown
                    }`}>
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
                    <SecondStep selectedColumn={column} handlePressBack={handlePressBack} />
                )}
            </div>
        </Modal>
    );
};

export default ActionModal;
