import React, { memo, SyntheticEvent, useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { SET_USER_NAME } from "graphql/user/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
import { Button, Input } from "components/basic";
import { MIN_NAME_LENGTH } from "config/constants";
import { AuthContext } from "../../../../providers/authContext";
import styles from "./PasswordModal.module.css";
import { HTMLButtonTypes } from "components/basic/Button/types";

interface Props {
    name: string;
    onClose: () => void;
}

const _NameModal: React.FC<Props> = ({ name, onClose }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [formError, setFormError] = useState("");
    const [inputValue, setInputValue] = useState(name);
    const [sendData, { loading, error }] = useMutation(SET_USER_NAME, {
        variables: { name: inputValue },
        refetchQueries: [{ query: GET_USER_INFO, variables: { user_id } }]
    });

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        sendData()
            .then((response) => {
                onClose();
                setFormError(response.data.changeName.error);
            })
            .catch((err) => {
                setFormError(err.message);
                console.error(error);
            });
    };

    const isValid = () => inputValue && inputValue !== name && inputValue.length >= MIN_NAME_LENGTH;

    return (
        <>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.fieldset}>
                    <div className={styles.oneInputAlign}>
                        <Input
                            value={`${inputValue}`}
                            error={formError}
                            width={250}
                            responsive
                            onChangeText={(value) => setInputValue(value)}
                        />
                    </div>
                    <div className={styles.btns}>
                        <Button
                            buttonType={HTMLButtonTypes.submit}
                            className={styles.btn}
                            width={120}
                            title="Change"
                            icon="check"
                            type="success"
                            disabled={!isValid()}
                            isUppercase
                            isLoading={loading}
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

export const NameModal = memo(_NameModal);
