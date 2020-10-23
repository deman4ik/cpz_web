import React, { useState, useEffect, useMemo, memo, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { EDIT_SIGNAL, SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { SUBSCRIBE } from "graphql/local/mutations";
import { Button, Input, Select } from "components/basic";
import { ErrorLine, LoadingIndicator } from "components/common";
import { volumeTypeOptions, getLimitsForSignal, calculateCurrency, calculateAsset, buildSettings } from "./helpers";
import { event } from "libs/gtag";
import styles from "./index.module.css";
import styles_subs from "./SubscribeModal.module.css";

interface Props {
    type?: string;
    setTitle: (title: string) => void;
    onClose: () => void;
}

const ValueInput = ({ isValid, volume, onKeyPress, onChangeText, value }) => (
    <div className={styles.volume}>
        <Input
            type="number"
            value={`${volume}`}
            width={150}
            error={!isValid()}
            right
            onKeyPress={onKeyPress}
            onChangeText={onChangeText}
        />
        <span className={styles.volume_text}>{value || ""}</span>
    </div>
);

const _SubscribeModal: React.FC<Props> = ({ type, setTitle, onClose }) => {
    const [formError, setFormError] = useState("");

    const { data: robotData } = useQuery(ROBOT);

    const volumeTypeDescriptions = useMemo(
        () => ({
            assetStatic: `All positions trading amount will be fixed in ${robotData?.robot.subs.asset}`,
            currencyDynamic: `All positions trading amount will be fixed in ${robotData?.robot.subs.currency}`
        }),
        [robotData]
    );

    const { data: limitsData, loading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: !robotData ? null : robotData?.robot.subs.exchange,
            asset: !robotData ? null : robotData?.robot.subs.asset,
            currency: !robotData ? null : robotData?.robot.subs.currency
        },
        skip: !robotData
    });

    const limits = useMemo(() => !loading && limitsData && getLimitsForSignal(limitsData), [loading, limitsData]);

    const [volume, setVolume] = useState("0");
    const [volumeInCurrency, setVolumeInCurrency] = useState("0");
    const [volumeType, setVolumeType] = useState(volumeTypeOptions[0].value);

    const [subscribe, { loading: subscribeLoading, error: subscribeError }] = useMutation(SUBSCRIBE_TO_SIGNALS);
    const [edit, { loading: editLoading, error: editError }] = useMutation(EDIT_SIGNAL);

    const [cacheSubscription] = useMutation(SUBSCRIBE);

    const writeToCache = (settings) =>
        cacheSubscription({
            variables: {
                cache: robotData?.robot.cache,
                settings,
                type,
                chartData: robotData?.ChartData
            }
        });

    const handleOnChangeAsset = (value: string) => {
        setVolume(value);
        setVolumeInCurrency(calculateCurrency(value, limits?.price));
    };

    const handleOnChangeCurrency = (value: string) => {
        setVolumeInCurrency(value);
        setVolume(calculateAsset(value, limits?.price));
    };

    useEffect(() => {
        if (robotData && limits) {
            setVolume(
                robotData.robot.subs.settings.volume ||
                    calculateAsset(robotData.robot.subs.settings.volumeInCurrency, limits.price)
            );
            setVolumeInCurrency(
                robotData.robot.subs.settings.volumeInCurrency ||
                    calculateCurrency(robotData.robot.subs.settings.volume, limits.price)
            );
            setVolumeType(robotData.robot.subs.settings.volumeType);
            setTitle(type === "edit" ? `Edit ${robotData.robot.name}` : `Follow ${robotData.robot.name}`);
        }
    }, [setTitle, robotData, limits, type]);

    useEffect(() => {
        if (!subscribeLoading && !editLoading && (subscribeError || editError))
            setFormError(subscribeError?.graphQLErrors[0].message || editError?.graphQLErrors[0].message);
    }, [editError, editLoading, subscribeError, subscribeLoading]);

    const handleOnSubmit = () => {
        const settings = buildSettings({ volumeType, volume, volumeInCurrency });
        const variables = {
            robotId: robotData?.robot.id,
            settings
        };
        if (type === "edit") {
            edit({ variables }).then((res) => {
                if (res.data.userSignalEdit.result === "OK") {
                    writeToCache(settings);
                    onClose();
                }
            });
        } else
            subscribe({ variables }).then((res) => {
                if (res.data.userSignalSubscribe.result === "OK") {
                    writeToCache(settings);
                    if (type !== "edit") {
                        event({
                            action: "subscribe",
                            category: "Signals",
                            label: "subscribe",
                            value: robotData?.robot.id
                        });
                    }
                    onClose();
                }
            });
    };

    const isVolumeValid = () =>
        Number(volume) >= limits?.asset?.min.amount && Number(volume) <= limits?.asset?.max.amount;

    const isCurrencyValid = () =>
        Number(volumeInCurrency) >= limits?.asset?.min.amountUSD &&
        Number(volumeInCurrency) <= limits?.asset?.max.amountUSD;

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter" && isVolumeValid() && isCurrencyValid()) {
            handleOnSubmit();
        }
    };

    // TODO: return a Modal component instead of this nonsense
    return (
        <>
            {loading || subscribeLoading || !robotData ? (
                <LoadingIndicator />
            ) : (
                <>
                    <ErrorLine formError={formError} />
                    <div className={styles.container}>
                        <div className={styles.bodyTitle}>Select amount type and enter desired trading amount</div>
                        <div className={styles_subs.form}>
                            <div className={[styles.bodyText, styles_subs.formComment].join(" ")}>
                                <div className={styles.value_group}>
                                    <div className={styles_subs.label}>Minimal value is&nbsp;</div>
                                    <div className={styles.value_row}>
                                        <span>{limits.asset.min.amount}</span>&nbsp;
                                        <span style={{ color: "white" }}>
                                            {robotData ? robotData?.robot.subs.asset : ""}
                                        </span>
                                        &nbsp;≈&nbsp;{limits.asset.min.amountUSD}
                                        &nbsp;$
                                    </div>
                                </div>
                            </div>
                            <div className={styles_subs.fieldset}>
                                <div>
                                    <Select data={volumeTypeOptions} value={volumeType} onChangeValue={setVolumeType} />
                                </div>
                                <div className={`${styles_subs.label} ${styles_subs.small}`}>
                                    {volumeTypeDescriptions[volumeType]}
                                </div>
                            </div>
                            <div className={styles_subs.fieldset}>
                                <div className={styles.input_group}>
                                    {(volumeType === "assetStatic" && (
                                        <ValueInput
                                            isValid={isVolumeValid}
                                            volume={volume}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeAsset}
                                            value={robotData.robot.subs.asset}
                                        />
                                    )) || (
                                        <ValueInput
                                            isValid={isCurrencyValid}
                                            volume={volumeInCurrency}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeCurrency}
                                            value={robotData.robot.subs.currency}
                                        />
                                    )}
                                    <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                        ≈
                                    </span>
                                    {(volumeType === "assetStatic" && (
                                        <ValueInput
                                            isValid={isCurrencyValid}
                                            volume={volumeInCurrency}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeCurrency}
                                            value={robotData.robot.subs.currency}
                                        />
                                    )) || (
                                        <ValueInput
                                            isValid={isVolumeValid}
                                            volume={volume}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeAsset}
                                            value={robotData.robot.subs.asset}
                                        />
                                    )}
                                </div>
                                <div className={styles_subs.btns}>
                                    <Button
                                        className={styles.btn}
                                        title={type === "edit" ? "Apply" : "OK"}
                                        icon="check"
                                        type="success"
                                        disabled={!(isVolumeValid() && isCurrencyValid())}
                                        isUppercase
                                        onClick={handleOnSubmit}
                                    />
                                    <Button
                                        className={styles.btn}
                                        title="Cancel"
                                        icon="close"
                                        type="dimmed"
                                        isUppercase
                                        onClick={onClose}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const SubscribeModal = memo(_SubscribeModal);
