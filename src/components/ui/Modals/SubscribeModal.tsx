import React, { useState, useEffect, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { EDIT_SIGNAL, SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { SUBSCRIBE } from "graphql/local/mutations";
import { Button, Input, Select } from "components/basic";
import { ErrorLine, LoadingIndicator } from "components/common";
import {
    volumeTypeOptions,
    getLimitsForSignal,
    calculateCurrency,
    calculateAsset,
    formatNumber,
    buildSettings,
    getAmtErrors
} from "./helpers";
import { event } from "libs/gtag";
import styles from "./index.module.css";
import styles_subs from "./SubscribeModal.module.css";

interface Props {
    type?: string;
    setTitle: (title: string) => void;
    onClose: () => void;
}

const ValueInput = ({ validate, volume, onKeyPress, onChangeText, unit }) => (
    <div className={styles.volume}>
        <Input
            type="number"
            value={`${volume}`}
            width={150}
            error={validate()}
            right
            onKeyPress={onKeyPress}
            onChangeText={onChangeText}
        />
        <span className={styles.volume_text}>{unit || ""}</span>
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

    const [volume, setVolume] = useState(0);
    const [displayedVolume, setDisplayedVolume] = useState("0");

    const [volumeInCurrency, setVolumeInCurrency] = useState(0);
    const [displayedCurrency, setDisplayedCurrency] = useState("0");

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
        setVolume(Number(value));

        const newCurrency = calculateCurrency(value, limits?.price);
        setVolumeInCurrency(newCurrency);
        setDisplayedCurrency(formatNumber(newCurrency));
    };

    const handleOnChangeCurrency = (value: string) => {
        setVolumeInCurrency(Number(value));

        const newVolume = calculateAsset(value, limits?.price);
        setVolume(newVolume);
        setDisplayedVolume(formatNumber(newVolume));
    };

    useEffect(() => {
        if (robotData && limits) {
            const initialVolume =
                robotData.robot.subs.settings.volume ||
                calculateAsset(robotData.robot.subs.settings.volumeInCurrency, limits.price);
            const initialCurrency =
                robotData.robot.subs.settings.volumeInCurrency ||
                calculateCurrency(robotData.robot.subs.settings.volume, limits.price);

            setVolume(initialVolume);
            setDisplayedVolume(formatNumber(initialVolume));

            setVolumeInCurrency(initialCurrency);
            setDisplayedCurrency(formatNumber(initialCurrency));

            setVolumeType(robotData.robot.subs.settings.volumeType);

            setTitle(`${type === "edit" ? "Edit" : "Follow"} ${robotData.robot.name}`);
        }
    }, [setTitle, robotData, limits, type]);

    useEffect(() => {
        let ref = null;
        if (!subscribeLoading && !editLoading && (subscribeError || editError)) {
            setFormError(subscribeError?.graphQLErrors[0].message || editError?.graphQLErrors[0].message);
            ref = setTimeout(() => setFormError(""), 2000);
        }
        return () => clearTimeout(ref);
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

    const getVolumeErrors = () => {
        return getAmtErrors(volume, limits?.asset?.min.amount, limits?.asset?.max.amount);
    };

    const getCurrencyErrors = () => {
        return getAmtErrors(volumeInCurrency, limits?.asset?.min.amountUSD, limits?.asset?.max.amountUSD);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter" && !getVolumeErrors() && !getCurrencyErrors()) {
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
                                    <Select
                                        data={volumeTypeOptions}
                                        value={volumeType}
                                        onChangeValue={setVolumeType}
                                        enabled={!editLoading && !subscribeLoading}
                                    />
                                </div>
                                <div className={`${styles_subs.label} ${styles_subs.small}`}>
                                    {volumeTypeDescriptions[volumeType]}
                                </div>
                            </div>
                            <div className={styles_subs.fieldset}>
                                <div className={styles.input_group}>
                                    {(volumeType === "assetStatic" && (
                                        <ValueInput
                                            validate={getVolumeErrors}
                                            volume={displayedVolume}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeAsset}
                                            unit={robotData.robot.subs.asset}
                                        />
                                    )) || (
                                        <ValueInput
                                            validate={getCurrencyErrors}
                                            volume={displayedCurrency}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeCurrency}
                                            unit={robotData.robot.subs.currency}
                                        />
                                    )}
                                    <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                        ≈
                                    </span>
                                    {(volumeType === "assetStatic" && (
                                        <ValueInput
                                            validate={getCurrencyErrors}
                                            volume={displayedCurrency}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeCurrency}
                                            unit={robotData.robot.subs.currency}
                                        />
                                    )) || (
                                        <ValueInput
                                            validate={getVolumeErrors}
                                            volume={displayedVolume}
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={handleOnChangeAsset}
                                            unit={robotData.robot.subs.asset}
                                        />
                                    )}
                                </div>
                                <div className={styles_subs.btns}>
                                    <Button
                                        className={styles.btn}
                                        title={type === "edit" ? "Apply" : "OK"}
                                        icon="check"
                                        type="success"
                                        disabled={!!getVolumeErrors() && !!getCurrencyErrors()}
                                        isUppercase
                                        onClick={handleOnSubmit}
                                        isLoading={subscribeLoading || editLoading}
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
