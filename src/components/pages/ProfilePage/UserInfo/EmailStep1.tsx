import React from "react";

import { Input, Button } from "components/basic";
import styles from "./EmailModal.module.css";

interface Props {
    error: boolean;
    setNewEmail: (value: string) => void;
    onKeyPressChange: (e: any) => void;
    changeLoading: boolean;
    onAcceptEmail: () => void;
    onClose: () => void;
    newEmail: string;
}

export const EmailStep1: React.FC<Props> = ({
    error,
    newEmail,
    setNewEmail,
    onKeyPressChange,
    changeLoading,
    onAcceptEmail,
    onClose
}) => (
    <>
        <Input
            placeholder="Email"
            width={260}
            error={error}
            value={newEmail}
            onChangeText={(value) => setNewEmail(value)}
            onKeyPress={onKeyPressChange}
        />
        <div className={styles.btns}>
            <Button
                className={styles.btn}
                width={130}
                title="Accept"
                icon="check"
                type="success"
                disabled={error}
                isUppercase
                isLoading={changeLoading}
                onClick={onAcceptEmail}
            />
            <Button
                className={styles.btn}
                width={120}
                title="Cancel"
                icon="close"
                type="dimmed"
                isUppercase
                onClick={onClose}
            />
        </div>
    </>
);
