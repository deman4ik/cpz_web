import React, { memo, useState } from "react";
import { useMutation } from "@apollo/client";

import { SET_USER_NAME } from "graphql/user/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
import { Button, Input } from "components/basic";
import { MIN_NAME_LENGTH } from "config/constants";
import styles from "./PasswordModal.module.css";

interface Props {
    name: string;
    onClose: () => void;
}

const _NameModal: React.FC<Props> = ({ name, onClose }) => {
    const [formError, setFormError] = useState("");
    const [inputValue, setInputValue] = useState(name);
    const [sendData, { loading, error }] = useMutation(SET_USER_NAME, {
        variables: { name: inputValue },
        refetchQueries: [{ query: GET_USER_INFO }]
    });

    if (error) {
        console.error(error);
    }

    const submit = () => {
        sendData().then((response) => {
            if (response.data.changeName.success) {
                onClose();
            } else {
                setFormError(response.data.changeName.error);
            }
        });
    };

    const isValid = () => inputValue && inputValue !== name && inputValue.length >= MIN_NAME_LENGTH;

    const onKeyPress = (e) => {
        if (formError) setFormError("");
        if (e.nativeEvent.key === "Enter" && isValid()) {
            submit();
        }
    };

    return (
        <>
            <div className={styles.form}>
                <div className={styles.fieldset}>
                    <div className={styles.oneInputAlign}>
                        <Input
                            value={`${inputValue}`}
                            error={formError}
                            width={250}
                            responsive
                            onChangeText={(value) => setInputValue(value)}
                            onKeyPress={onKeyPress}
                        />
                    </div>
                    <div className={styles.btns}>
                        <Button
                            className={styles.btn}
                            width={120}
                            title="Change"
                            icon="check"
                            type="success"
                            disabled={!isValid()}
                            isUppercase
                            isLoading={loading}
                            onClick={submit}
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
            </div>
        </>
    );
};

export const NameModal = memo(_NameModal);
