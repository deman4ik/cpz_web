import React from "react";

import { Input, Button } from "components/basic";
import { SECRET_CODE_LENGTH } from "config/constants";
import styles from "./EmailModal.module.css";

interface Props {
    error: boolean;
    setSecretCode: (value: string) => void;
    onKeyPressConfirm: (e: any) => void;
    confirmLoading: boolean;
    setStep: (step: number) => void;
    onConfirmEmail: () => void;
    secretCode: string;
}

export const EmailStep2: React.FC<Props> = ({
    error,
    secretCode,
    setSecretCode,
    onKeyPressConfirm,
    setStep,
    confirmLoading,
    onConfirmEmail
}) => (
    <>
        <div className={styles.description}>
            A letter with a confirmation code was sent to your new Email address, please enter the code from the letter
            in the field below
        </div>
        <Input
            error={error}
            width={260}
            placeholder="Confirmation code"
            label="Confirmation code"
            value={secretCode}
            maxLength={SECRET_CODE_LENGTH}
            onChangeText={(value) => setSecretCode(value)}
            autoComplete="one-time-code"
            onKeyPress={onKeyPressConfirm}
        />
        <div className={styles.btns}>
            <Button
                className={styles.btn}
                width={120}
                title="Back"
                icon="chevronleft"
                type="dimmed"
                isUppercase
                onClick={() => setStep(1)}
            />
            <Button
                className={styles.btn}
                width={130}
                title="Confirm"
                icon="check"
                type="success"
                disabled={error}
                isUppercase
                isLoading={confirmLoading}
                onClick={onConfirmEmail}
            />
        </div>
    </>
);
