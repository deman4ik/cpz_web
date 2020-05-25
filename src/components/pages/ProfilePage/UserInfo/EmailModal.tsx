/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { SECRET_CODE_LENGTH } from "config/constants";
import { CHANGE_USER_EMAIL, CONFIRM_USER_EMAIL } from "graphql/user/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
import { validateEmail } from "config/validation";
import { StepWizard } from "components/basic";
import { EmailStep1 } from "./EmailStep1";
import { EmailStep2 } from "./EmailStep2";
import styles from "./EmailModal.module.css";

interface Props {
    email: string;
    setTitle: (title: string) => void;
    onClose: () => void;
    width: number;
}

const steps = ["Enter new Email", "Confirm Email change"];
const _EmailModal: React.FC<Props> = ({ email, onClose, setTitle, width }) => {
    const [formError, setFormError] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [step, setStep] = useState(1);
    const [newEmail, setNewEmail] = useState(email);

    const [sendChangeEmail, { loading: changeLoading, error: changeError }] = useMutation(CHANGE_USER_EMAIL, {
        variables: { email: newEmail }
    });

    const [sendConfirmEmail, { loading: confirmLoading, error: confirmError }] = useMutation(CONFIRM_USER_EMAIL, {
        variables: { secretCode },
        refetchQueries: [{ query: GET_USER_INFO }]
    });

    if (changeError || confirmError) {
        console.error(changeError || confirmError);
    }

    useEffect(() => {
        setTitle(steps[0]);
    }, []);

    const onAcceptEmail = () => {
        sendChangeEmail().then((response) => {
            if (response.data.changeEmail.success) {
                setStep(2);
                setTitle(steps[step - 1].toString());
            } else {
                setFormError(response.data.changeEmail.error);
            }
        });
    };

    const onConfirmEmail = () => {
        sendConfirmEmail().then((response) => {
            if (response.data.confirmChangeEmail.success) {
                onClose();
            } else {
                setFormError(response.data.confirmChangeEmail.error);
            }
        });
    };

    const isValidEmail = () => email !== newEmail && validateEmail(newEmail);
    const isValidSecretCode = () => secretCode && secretCode.length === SECRET_CODE_LENGTH;

    const onKeyPressChange = (e) => {
        if (formError) {
            setFormError("");
        }

        if (e.nativeEvent.key === "Enter" && isValidEmail()) {
            onAcceptEmail();
        }
    };

    const onKeyPressConfirm = (e) => {
        if (formError) {
            setFormError("");
        }

        if (e.nativeEvent.key === "Enter" && isValidSecretCode()) {
            onConfirmEmail();
        }
    };

    return (
        <>
            <div className={styles.wizardContainer}>
                <StepWizard steps={steps} activeStep={step} height={90} titleWidth={160} width={width} />
            </div>
            <div className={styles.form}>
                <div className={styles.fieldset}>
                    {step === 1 ? (
                        <EmailStep1
                            error={!isValidEmail()}
                            setNewEmail={setNewEmail}
                            onKeyPressChange={onKeyPressChange}
                            changeLoading={changeLoading}
                            onAcceptEmail={onAcceptEmail}
                            onClose={onClose}
                            newEmail={newEmail}
                        />
                    ) : (
                        <EmailStep2
                            error={!isValidSecretCode()}
                            setSecretCode={setSecretCode}
                            onKeyPressConfirm={onKeyPressConfirm}
                            confirmLoading={confirmLoading}
                            setStep={setStep}
                            onConfirmEmail={onConfirmEmail}
                            secretCode={secretCode}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export const EmailModal = memo(_EmailModal);
