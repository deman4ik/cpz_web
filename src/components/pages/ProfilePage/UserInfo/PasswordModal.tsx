/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { useFormValidation } from "hooks/useFormValidation";
import { SET_USER_PASSWORD } from "graphql/user/mutations";
import { validateAuth } from "config/validation";
import { Input, Button } from "components/basic";
import { ErrorLine } from "components/common";
import styles from "./PasswordModal.module.css";
import styles_main from "./index.module.css";
import { HTMLButtonTypes } from "components/basic/Button/types";

interface Props {
    onClose: () => void;
}

const INITIAL_STATE = {
    passwordOld: "",
    password: "",
    passwordRepeat: ""
};

const _PasswordModal: React.FC<Props> = ({ onClose }) => {
    const [formError, setFormError] = useState("");
    const { handleSubmit, handleChange, resetValues, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );

    const [sendPassword, result] = useMutation(SET_USER_PASSWORD, {
        variables: { oldPassword: values.passwordOld, password: values.password }
    });

    const { loading, error } = result;

    const submit = () => {
        sendPassword()
            .then(() => {
                resetValues();
                setFormError("");
                onClose();
            })
            .catch((e) => {
                setFormError(e.message);
                setValid(false);
                console.error(error);
            });
    };

    useEffect(() => {
        if (isValid) {
            submit();
        }
    }, [isValid]);

    return (
        <>
            {formError && <ErrorLine formError={formError} />}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldset}>
                    <div className={styles_main.formRow}>
                        <div className={styles.label}>Old Password</div>
                        <div className={styles_main.inputContainer}>
                            <Input
                                value={values.passwordOld}
                                type="password"
                                width={210}
                                onChangeText={(text: string) => handleChange("passwordOld", text)}
                            />
                        </div>
                    </div>
                    <div className={styles_main.formRow}>
                        <div className={styles.label}>
                            New Password <span className={styles.star}>*</span>
                        </div>
                        <div className={styles_main.inputContainer}>
                            <Input
                                value={values.password}
                                error={errors.password}
                                width={210}
                                type="password"
                                onChangeText={(text: string) => handleChange("password", text)}
                            />
                        </div>
                    </div>
                    <div className={styles_main.formRow}>
                        <div className={styles.label}>
                            Repeat Password <span className={styles.star}>*</span>
                        </div>
                        <div className={styles_main.inputContainer}>
                            <Input
                                value={values.passwordRepeat}
                                error={errors.passwordRepeat}
                                width={210}
                                type="password"
                                onChangeText={(text: string) => handleChange("passwordRepeat", text)}
                            />
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <Button
                            buttonType={HTMLButtonTypes.submit}
                            className={styles.btn}
                            width={120}
                            title="Change"
                            icon="check"
                            type="success"
                            isUppercase
                            isLoading={loading}
                            onClick={handleSubmit}
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
                </div>
            </form>
        </>
    );
};

export const PasswordModal = memo(_PasswordModal);
