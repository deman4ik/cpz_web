import React, { useState, useCallback } from "react";
import { Modal } from "components/basic/Modal";
import styles from "./index.module.css";
import SecondStep from "./components/SecondStep";
import { Button } from "components/basic/Button";

type Props = {
    columns: any;
    isOpen: boolean;
    toggle: () => void;
    selectedRows: any;
    onSubmit: () => void;
};

enum Steps {
    select = "Select an action",
    input = "Enter new value"
}

const ActionModal = ({ columns, isOpen, toggle, selectedRows, onSubmit }: Props): JSX.Element => {
    const [step, setStep] = useState(Steps.select);
    const [selectedColumn, setColumn] = useState(null);
    const [inputRemovalBlocked, setBlock] = useState(false);

    const reset = useCallback((delay = 0) => {
        setBlock(true);
        setStep(Steps.select);
        setTimeout(() => {
            setBlock(false);
            setColumn(null);
        }, delay);
    }, []);

    const handlePressItem = (column) => {
        setColumn(column);
        setStep(Steps.input);
    };

    const handlePressBack = () => {
        reset(150);
    };

    const handleClose = () => {
        toggle();
        reset();
    };

    const submitAndClose = () => {
        onSubmit();
        handleClose();
    };

    return (
        <Modal isOpen={isOpen} title={step} onClose={handleClose} style={{ width: 400 }} contentHeight={230}>
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
                                    <div key={j}>
                                        <Button
                                            type="dimmed"
                                            title={`Edit ${col.Header}`}
                                            onClick={() => handlePressItem(col)}
                                        />
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
