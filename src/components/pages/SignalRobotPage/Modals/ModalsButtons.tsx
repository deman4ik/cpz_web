import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { Button } from "components/basic";
import styles from "components/ui/Modals/index.module.css";
import React from "react";

export const ModalButtons = ({ okTitle, cancelTitle, disabled, onOk, onCancel, isLoading }) => {
    return (
        <div className={styles_subs.btns} style={{ marginBottom: 20}}>
            <Button
                className={styles.btn}
                title={okTitle}
                icon="check"
                type="success"
                disabled={disabled}
                isUppercase
                onClick={onOk}
                isLoading={isLoading}
            />
            <Button
                className={styles.btn}
                title={cancelTitle}
                icon="close"
                type="dimmed"
                isUppercase
                onClick={onCancel}
            />
        </div>
    );
};
