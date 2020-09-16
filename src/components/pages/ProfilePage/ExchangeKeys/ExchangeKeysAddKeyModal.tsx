import React, { memo, useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_EXCHANGES, GET_USER_EXCHANGES } from "graphql/profile/queries";
import { GET_USER_ROBOTS_BY_EXCHANGE_ID } from "graphql/robots/queries";
import { UPDATE_EXCHANGE_KEY } from "graphql/profile/mutations";
import { Button, Select, Input, Textarea } from "components/basic";
import { color } from "config/constants";
import { event } from "libs/gtag";
import { AddKey } from "./types";
// context
import { AuthContext } from "libs/hoc/context";
import styles from "./ExchangeKeysAddKeyModal.module.css";

interface Props {
    options?: AddKey;
    exchange?: string;
    refetchQueries?: any; // Todo any
    isExchangeDisabled?: boolean;
    onClose?: () => void;
    handleOnSubmit?: (key: string) => void;
}

const _ExchangeKeysAddKeyModal: React.FC<Props> = ({
    options,
    exchange,
    refetchQueries,
    isExchangeDisabled,
    onClose,
    handleOnSubmit
}) => {
    const [inputName, setInputName] = useState(options ? options.name : "");
    const [inputExchange, setInputExchange] = useState(options && options.exchange ? options.exchange : exchange);
    const [responseError, setResponseError] = useState({ error: false, msg: "" });
    const [isFetchResponse, setIsFetchResponse] = useState(false);
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [inputKeys, setInputKeys] = useState({ public: "", secret: "" });
    const [dataPicker, setDataPicker] = useState([]);
    const { data, loading } = useQuery(GET_EXCHANGES);

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [addKey] = useMutation(UPDATE_EXCHANGE_KEY, {
        variables: {
            name: inputName || null,
            exchange: inputExchange,
            keys: { key: inputKeys.public, secret: inputKeys.secret },
            id: options ? options.id : ""
        },
        refetchQueries: [...(refetchQueries || []), { query: GET_USER_EXCHANGES }],
        errorPolicy: "all"
    });

    const { data: dataCheck, loading: loadingCheck } = useQuery(GET_USER_ROBOTS_BY_EXCHANGE_ID, {
        variables: {
            user_ex_acc_id: options ? options.id : null,
            user_id
        }
    });
    const handleOnChangeName = (value: string) => {
        setInputName(value);
    };

    const handleOnChangeExchange = (value: string) => {
        setInputExchange(value);
    };

    const handleOnChangeKeys = (text: string, key: string) => {
        setInputKeys((prev) => ({ ...prev, [key]: text }));
    };

    const handleOnPress = () => {
        if (!inputKeys.public.trim().length || !inputKeys.secret.trim().length) {
            setResponseError({
                error: true,
                msg: "Public and Private API Keys are required"
            });
            return;
        }
        if (inputName.length > 50) {
            setResponseError({ error: true, msg: "Too long name. Max 50" });
            return;
        }
        setIsFetchResponse(true);
        addKey().then((response) => {
            setIsFetchResponse(false);
            if (response.errors) {
                setResponseError({
                    error: true,
                    msg: response.errors.map((e) => e.message).join(" ")
                });
            } else if (response.data.userExchangeAccUpsert.success) {
                setResponseError({ error: false, msg: "" });
                if (!options) {
                    event({
                        action: "add_api_key",
                        category: "Profile",
                        label: "add_api_key",
                        value: "add_api_key"
                    });
                }
                if (handleOnSubmit) {
                    handleOnSubmit(response.data.userExchangeAccUpsert.result);
                } else {
                    onClose();
                }
            } else {
                setResponseError({
                    error: true,
                    msg: response.data.userExchangeAccUpsert.error
                });
            }
        });
    };

    useEffect(() => {
        if (!loading) {
            setDataPicker(
                data.exchanges.map((item) => ({
                    label: item.name,
                    value: item.code
                }))
            );
            if (!inputExchange && data.exchanges && data.exchanges.length > 0) setInputExchange(data.exchanges[0].code);
        }
    }, [inputExchange, loading, data]);

    useEffect(() => {
        if (!loadingCheck && options) {
            const checkElements = ["stopped", "paused"];
            setDisabledEdit(
                dataCheck.user_robots.some((el) => checkElements.includes(el.status)) && options.status !== "invalid"
            );
        }
    }, [options, loadingCheck, dataCheck]);

    return (
        <>
            {responseError.error && (
                <div className={styles.errorContainer} style={{ marginTop: 0 }}>
                    <div className={styles.errorText}>{responseError.msg}</div>
                </div>
            )}
            <div className={styles.container}>
                <div style={{ marginBottom: 20 }}>
                    <div className={styles.tableCellText}>My Exchange API Key Name</div>
                    <div style={{ marginTop: 6 }}>
                        <Input
                            value={inputName}
                            selectTextOnFocus
                            width={260}
                            readonly={!!options}
                            onChangeText={(value) => handleOnChangeName(value)}
                        />
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div className={styles.tableCellText}>Exchange</div>
                    <div style={{ marginTop: 6 }}>
                        <Select
                            value={inputExchange}
                            data={dataPicker}
                            width={260}
                            enabled={!isExchangeDisabled}
                            onChangeValue={(itemValue) => handleOnChangeExchange(itemValue)}
                        />
                    </div>
                </div>
                <div className={styles.areaGroup}>
                    <div className={styles.row}>
                        <div className={styles.apikeyGroup}>
                            <div className={styles.tableCellText}>API Key (Public Key)&nbsp;</div>
                            <div className={styles.tableCellText} style={{ color: color.negative }}>
                                *
                            </div>
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <Textarea
                                value={inputKeys.public}
                                rows={5}
                                onChangeText={(text) => handleOnChangeKeys(text, "public")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.apikeyGroup}>
                            <div className={styles.tableCellText}>API Secret (Private Key)&nbsp;</div>
                            <div className={styles.tableCellText} style={{ color: color.negative }}>
                                *
                            </div>
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <Textarea
                                value={inputKeys.secret}
                                rows={5}
                                onChangeText={(text) => handleOnChangeKeys(text, "secret")}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.apikeyGroup}>
                    <Button
                        type="success"
                        width={125}
                        title={options ? "edit key" : "add key"}
                        onClick={handleOnPress}
                        isLoading={isFetchResponse}
                        disabled={disabledEdit}
                        icon="check"
                        isUppercase
                    />
                    <Button
                        type="dimmed"
                        width={125}
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

export const ExchangeKeysAddKeyModal = memo(_ExchangeKeysAddKeyModal);
