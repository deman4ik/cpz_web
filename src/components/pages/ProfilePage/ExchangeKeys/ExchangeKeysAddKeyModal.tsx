import React, { memo, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_EXCHANGES, GET_USER_EXCHANGES } from "graphql/profile/queries";
import { UPDATE_EXCHANGE_KEY } from "graphql/profile/mutations";
import { Button, Select, Input, Textarea } from "components/basic";
import { color } from "config/constants";
import { event } from "libs/gtag";
import { ExchangeKeysAddKeyModalProps, UpdateExchangeKeyVars } from "./types";
// context
import styles from "./ExchangeKeysAddKeyModal.module.css";
import { fetchWithStatus } from "components/pages/helpers";
import { HTMLButtonTypes } from "components/basic/Button/types";

const errorMessages = {
    KEYS_ARE_REQUIRED: "Both Public and Private API Keys are required",
    LONG_NAME: "Max name length is 50 symbols."
};

const _ExchangeKeysAddKeyModal: React.FC<ExchangeKeysAddKeyModalProps> = ({
    options,
    exchange,
    refetchQueries,
    isExchangeDisabled,
    onClose,
    handleOnSubmit,
    displayGuide = false
}) => {
    const [inputName, setInputName] = useState(options ? options.name : "");
    const [inputPassword, setInputPassword] = useState("password");
    const [credentialsPassword, setCredentialsPassword] = useState(false);

    const [guideDisplayed, setGuideDisplayed] = useState(displayGuide);
    const [receivedExchangeCode, setReceivedExchangeCode] = useState(
        options && options.exchange ? options.exchange : exchange
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [inputKeys, setInputKeys] = useState({ public: "", secret: "" });

    const [exchanges, setExchanges] = useState([]);
    const [chosenExchange, setChosenExchange] = useState(null);

    const { data } = useQuery(GET_EXCHANGES, {
        onCompleted: () => {
            setExchanges(data.exchanges);
            if (data.exchanges.length > 0 && !receivedExchangeCode) {
                setChosenExchange(data.exchanges[0]);
                setReceivedExchangeCode(data.exchanges[0].code);
            } else if (!chosenExchange) {
                setChosenExchange(data.exchanges.find((ex) => ex.code === receivedExchangeCode));
            }
        }
    });

    useEffect(() => {
        if (chosenExchange !== null) setCredentialsPassword(chosenExchange.options.requiredCredentials.pass);
    }, [chosenExchange]);

    const variables: UpdateExchangeKeyVars = {
        name: inputName || null,
        exchange: receivedExchangeCode,
        keys: { key: inputKeys.public, secret: inputKeys.secret }
    };
    if (options && options.id) {
        variables.id = options.id;
    }
    const [addKey] = useMutation(UPDATE_EXCHANGE_KEY, {
        variables,
        refetchQueries: [...(refetchQueries || []), { query: GET_USER_EXCHANGES }],
        errorPolicy: "all"
    });

    const handleOnChangeName = (value: string) => {
        setInputName(value);
    };

    const handleOnChangePassword = (value: string) => {
        setInputPassword(value);
    };

    const handleOnChangeExchange = (code: string) => {
        setReceivedExchangeCode(code);
        setChosenExchange(exchanges.find((ex) => ex.code === code));
    };

    const handleOnChangeKeys = (text: string, key: string) => {
        setInputKeys((prev) => ({ ...prev, [key]: text }));
    };

    const handleOnPress = async (e) => {
        e.preventDefault();
        if (!inputKeys.public.trim().length || !inputKeys.secret.trim().length) {
            setErrorMessage(errorMessages.KEYS_ARE_REQUIRED);
            return;
        }
        if (inputName.length > 50) {
            setErrorMessage(errorMessages.LONG_NAME);
            return;
        }

        const { data: fetchData, errors } = await fetchWithStatus(addKey, setIsFetching);

        if (errors) {
            setErrorMessage(errors.map((err) => err.message).join("\n"));
        } else if (fetchData.userExchangeAccUpsert.result?.error) {
            setErrorMessage(fetchData.userExchangeAccUpsert.result.error);
        } else {
            if (!options) {
                event({
                    action: "add_api_key",
                    category: "Profile",
                    label: "add_api_key",
                    value: "add_api_key"
                });
            }
            if (handleOnSubmit) {
                handleOnSubmit(fetchData.userExchangeAccUpsert.result);
            } else {
                onClose(true);
            }
        }
    };

    return (
        <>
            {errorMessage && (
                <div className={styles.errorContainer} style={{ marginTop: 0 }}>
                    <div className={styles.errorText}>{errorMessage}</div>
                </div>
            )}
            <form className={styles.container} onSubmit={handleOnPress}>
                {guideDisplayed && chosenExchange && (
                    <div className={styles.guide} style={{ width: 260 }}>
                        <div className={styles.closeGuideButton}>
                            <Button icon="close" onClick={() => setGuideDisplayed(false)} />
                        </div>
                        Don&apos;t have a {chosenExchange.name} account? <br />
                        Register it{" "}
                        <a href={chosenExchange.ref_link} target="_blank" rel="noreferrer">
                            here
                        </a>
                        .
                        <br />
                        <br /> Learn how to create API Keys in{" "}
                        <a href={chosenExchange.docs_link} target="_blank" rel="noreferrer">
                            our guide
                        </a>
                        .
                    </div>
                )}
                <div style={{ margin: "20px 0" }}>
                    <div className={styles.tableCellText}>My Exchange API Key Name</div>
                    <div style={{ marginTop: 6 }}>
                        <Input
                            value={inputName}
                            selectTextOnFocus
                            width={260}
                            disabled={!!options}
                            onChangeText={(value) => handleOnChangeName(value)}
                        />
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div className={styles.tableCellText}>Exchange</div>
                    <div style={{ marginTop: 6 }}>
                        <Select
                            value={receivedExchangeCode}
                            data={exchanges.map((item) => ({
                                label: item.name,
                                value: item.code
                            }))}
                            width={260}
                            enabled={!isExchangeDisabled}
                            onChangeValue={(itemValue) => handleOnChangeExchange(itemValue)}
                        />
                    </div>
                </div>
                {credentialsPassword && (
                    <div style={{ marginBottom: 20 }}>
                        <div className={styles.tableCellText}>Password</div>
                        <div style={{ marginTop: 6 }}>
                            <Input
                                value={inputPassword}
                                selectTextOnFocus
                                width={260}
                                onChangeText={(value) => handleOnChangePassword(value)}
                            />
                        </div>
                    </div>
                )}
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
                        buttonType={HTMLButtonTypes.submit}
                        type="success"
                        width={125}
                        title={options ? "edit key" : "add key"}
                        isLoading={isFetching}
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
            </form>
        </>
    );
};

export const ExchangeKeysAddKeyModal = memo(_ExchangeKeysAddKeyModal);
