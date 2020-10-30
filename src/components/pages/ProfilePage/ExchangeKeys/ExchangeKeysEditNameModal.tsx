import React, { useState, memo } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_EXCHANGE_NAME } from "graphql/profile/mutations";
import { GET_USER_EXCHANGES } from "graphql/profile/queries";
import { Button, Input } from "components/basic";
import { ErrorLine } from "components/common";
import styles from "./ExchangeKeysEditNameModal.module.css";
import { EditName } from "./types";
import { fetchWithStatus } from "components/pages/helpers";
import { HTMLButtonTypes } from "components/basic/Button/types";

interface Props {
    onClose: () => void;
    options: EditName;
}

const _ExchangeKeysEditNameModal: React.FC<Props> = ({ onClose, options }) => {
    const [formError, setFormError] = useState("");
    const [inputName, setInputName] = useState(options.name);
    const [isFetchReponse, setIsFetching] = useState(false);
    const [editName] = useMutation(UPDATE_EXCHANGE_NAME, {
        variables: {
            name: inputName,
            id: options ? options.id : ""
        },
        refetchQueries: [{ query: GET_USER_EXCHANGES }]
    });

    const handleOnChangeName = (value: string) => {
        setInputName(value);
    };

    const handleOnPress = async (e) => {
        e.preventDefault();
        if (!inputName.trim()) {
            setFormError("Name cannot be empty");
            return;
        }
        const { userExchangeAccChangeName, error } = await fetchWithStatus(editName, setIsFetching);

        const errorString = userExchangeAccChangeName?.error || error;
        if (errorString) {
            setFormError(errorString);
        } else {
            onClose();
        }
    };

    return (
        <>
            {formError && <ErrorLine formError={formError} />}
            <form className={styles.container} onSubmit={handleOnPress}>
                <div>
                    <div className={styles.tableCellText}>Name</div>
                    <div className={styles.inputWrapper}>
                        <Input
                            value={inputName}
                            placeholder="Name"
                            width={252}
                            onChangeText={(value) => handleOnChangeName(value)}
                        />
                    </div>
                </div>
                <div className={styles.groupBtn}>
                    <Button
                        buttonType={HTMLButtonTypes.submit}
                        type="success"
                        width={120}
                        title="save"
                        isLoading={isFetchReponse}
                        icon="check"
                        isUppercase
                    />
                    <Button
                        type="dimmed"
                        width={120}
                        title="cancel"
                        style={{ marginLeft: 15 }}
                        onClick={onClose}
                        icon="close"
                        isUppercase
                    />
                </div>
            </form>
        </>
    );
};

export const ExchangeKeysEditNameModal = memo(_ExchangeKeysEditNameModal);
