import React, { memo, useState, useEffect } from "react";
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

const exchangeLinks = [
    {
        exchange: "Binance Futures",
        links: [
            { label: "Create Binance account", link: "https://www.binance.com/en/futures/ref/cryptuoso" },
            { label: "Our guide", link: "https://support.cryptuoso.com/exchange-accounts/binance-futures" }
        ]
    },
    {
        exchange: "Bitfinex",
        links: [
            { label: "Create Bitfinex account", link: "https://www.bitfinex.com/?refcode=BBRrpRJZ" },
            { label: "Our guide", link: "https://support.cryptuoso.com/exchange-accounts/bitfinex" }
        ]
    },
    {
        exchange: "Kraken",
        links: [
            { label: "Create Kraken account", link: "https://r.kraken.com/mqVYO" },
            { label: "Our guide", link: "https://support.cryptuoso.com/exchange-accounts/kraken" }
        ]
    }
];

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
    const [guideDisplayed, setGuideDisplayed] = useState(displayGuide);
    const [inputExchange, setInputExchange] = useState(options && options.exchange ? options.exchange : exchange);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [inputKeys, setInputKeys] = useState({ public: "", secret: "" });
    const [dataPicker, setDataPicker] = useState([]);
    const { data, loading } = useQuery(GET_EXCHANGES);

    const variables: UpdateExchangeKeyVars = {
        name: inputName || null,
        exchange: inputExchange,
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

    const handleOnChangeExchange = (value: string) => {
        setInputExchange(value);
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

    return (
        <>
            {errorMessage && (
                <div className={styles.errorContainer} style={{ marginTop: 0 }}>
                    <div className={styles.errorText}>{errorMessage}</div>
                </div>
            )}
            <form className={styles.container} onSubmit={handleOnPress}>
                {guideDisplayed && (
                    <div className={styles.guide} style={{ width: 260 }}>
                        <div className={styles.closeGuideButton}>
                            <Button icon="close" onClick={() => setGuideDisplayed(false)} />
                        </div>
                        Don&apos;t have {exchange ? `a ${exchange}` : "an"} account? <br />
                        Register it here.
                        <br />
                        <br /> Learn how to create API Keys: <br />
                        <div className={styles.exchangesContainer}>
                            {exchangeLinks.map((item) => (
                                <div key={item.exchange} className={styles.exchange}>
                                    {item.exchange}
                                    <div>
                                        {item.links.map((el) => (
                                            <div key={el.label} className={styles.guideLink}>
                                                <a href={el.link} target="_blank" rel="noreferrer">
                                                    {el.label}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
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
