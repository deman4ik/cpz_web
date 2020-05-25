import React, { useState, memo } from "react";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_EXCHANGE_NAME } from "../../../../graphql/profile/mutations";
import { GET_USER_EXCHANGES } from "../../../../graphql/profile/queries";
import { Button, Input } from "../../../basic";
import { ErrorLine } from "../../../common";
import styles from "./ExchangeKeysEditNameModal.module.css";
import { EditName } from "./types";

interface Props {
    onClose: () => void;
    options: EditName;
}

const _ExchangeKeysEditNameModal: React.FC<Props> = ({ onClose, options }) => {
    const [formError, setFormError] = useState("");
    const [inputName, setInputName] = useState(options.name);
    const [isFetchReponse, setIsFetchReponse] = useState(false);
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

    const handleOnPress = () => {
        setIsFetchReponse(true);
        editName().then((response) => {
            setIsFetchReponse(false);
            if (response.data.userExchangeAccChangeName.success) {
                onClose();
            } else {
                setFormError(response.data.userExchangeAccChangeName.error);
            }
        });
    };

    return (
        <>
            {formError && <ErrorLine formError={formError} />}
            <div className={styles.container}>
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
                        type="success"
                        width={120}
                        title="save"
                        onClick={handleOnPress}
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
            </div>
        </>
    );
};

export const ExchangeKeysEditNameModal = memo(_ExchangeKeysEditNameModal);
