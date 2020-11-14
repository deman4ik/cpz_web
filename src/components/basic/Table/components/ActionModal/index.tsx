import React, { useState } from "react";
import { Modal } from "components/basic/Modal";
import styles from "./index.module.css";
import SecondStep from "./components/SecondStep";

type Props = {
    columns: any;
    isOpen: boolean;
    toggle: () => void;
    selectedRows: any;
    onSubmit: () => void;
};

enum Steps {
    select = "Select a column to edit",
    input = "Enter new value for selected entries"
}

const ActionModal = ({ columns, isOpen, toggle, selectedRows, onSubmit }: Props): JSX.Element => {
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
        setTimeout(() => {
            setBlock(false);
            setColumn(null);
        }, 150);
    };

    const submitAndClose = () => {
        onSubmit();
        toggle();
    };

    return (
        <Modal isOpen={isOpen} title={step} onClose={toggle} style={{ width: 400 }} contentHeight={230}>
            <div className={styles.body}>
                <div
                    className={`${styles.container} ${styles.firstStepContainer} ${
                        step === Steps.input ? styles.slideLeft : styles.unslide
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
                    <SecondStep
                        selectedColumn={selectedColumn}
                        handlePressBack={handlePressBack}
                        itemsIds={selectedRows.map((item) => item.original.id)}
                        onSubmit={submitAndClose}
                    />
                )}
            </div>
        </Modal>
    );
};

export default ActionModal;
