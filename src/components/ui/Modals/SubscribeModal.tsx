import React, { useState, useEffect, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { event } from "libs/gtag";

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
import styles from "./index.module.css";
import styles_subs from "./SubscribeModal.module.css";

interface Props {
    type?: string;
    setTitle: (title: string) => void;
    onClose: () => void;
}

const ValueInput = ({ validate, volume, onKeyPress, onChangeText, onSelect, unit }) => (
    <div className={styles.volume}>
        <Input
            type="number"
            value={`${volume}`}
            width={150}
            error={validate()}
            right
            onKeyPress={onKeyPress}
            onChangeText={onChangeText}
            onSelect={onSelect}
            selectTextOnFocus
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
    const volumeTypeIsAssetStatic = volumeType === "assetStatic";

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

    const onChangeAsset = (value: string) => {
        setVolume(Number(value));

        const newCurrency = calculateCurrency(value, limits?.price);
        setVolumeInCurrency(newCurrency);
        setDisplayedCurrency(formatNumber(newCurrency));
    };

    const onChangeCurrency = (value: string) => {
        setVolumeInCurrency(Number(value));

        const newVolume = calculateAsset(value, limits?.price);
        setVolume(newVolume);
        setDisplayedVolume(formatNumber(newVolume));
    };

    const onChangeVolumeType = (value: string) => {
        setVolumeType(value);

        if (volumeTypeIsAssetStatic) {
            setDisplayedVolume(formatNumber(volume));
            setDisplayedCurrency(volumeInCurrency.toString());
        } else {
            setDisplayedVolume(volume.toString());
            setDisplayedCurrency(formatNumber(volumeInCurrency));
        }
    };

    useEffect(() => {
        if (robotData && limits) {
            const initialVolume =
                robotData.robot.subs.settings.volume ||
                calculateAsset(robotData.robot.subs.settings.volumeInCurrency, limits.price);
            const initialCurrency =
                robotData.robot.subs.settings.volumeInCurrency ||
                calculateCurrency(robotData.robot.subs.settings.volume, limits.price);
            const initialVolumeType = robotData.robot.subs.settings.volumeType;

            setVolume(initialVolume);
            setDisplayedVolume(formatNumber(initialVolume));

            setVolumeInCurrency(initialCurrency);
            setDisplayedCurrency(formatNumber(initialCurrency));

            setVolumeType(initialVolumeType);

            setTitle(`${type === "edit" ? "Edit" : "Follow"} ${robotData.robot.name}`);
        }
    }, [setTitle, robotData, limits, type]);

    useEffect(() => {
        let ref = null;
        if (!subscribeLoading && !editLoading && (subscribeError || editError)) {
            setFormError(subscribeError?.graphQLErrors[0].message || editError?.graphQLErrors[0].message);
            ref = setTimeout(() => setFormError(""), 5000);
        }
        return () => clearTimeout(ref);
    }, [editError, editLoading, subscribeError, subscribeLoading]);

    const onSubmit = () => {
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

    const getVolumeErrors = () =>
        volumeTypeIsAssetStatic && getAmtErrors(volume, limits?.asset?.min.amount, limits?.asset?.max.amount);

    const getCurrencyErrors = () =>
        !volumeTypeIsAssetStatic &&
        getAmtErrors(volumeInCurrency, limits?.asset?.min.amountUSD, limits?.asset?.max.amountUSD);

    const getErrors = () => getVolumeErrors() && getCurrencyErrors();

    const onKeyPress = (e) => {
        if (e.key === "Enter" && !getErrors()) {
            onSubmit();
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
                                        onChangeValue={onChangeVolumeType}
                                        enabled={!editLoading && !subscribeLoading}
                                    />
                                </div>
                                <div className={`${styles_subs.label} ${styles_subs.small}`}>
                                    {volumeTypeDescriptions[volumeType]}
                                </div>
                            </div>
                            <div className={styles_subs.fieldset}>
                                <div className={styles.input_group}>
                                    {(volumeTypeIsAssetStatic && (
                                        <ValueInput
                                            validate={getVolumeErrors}
                                            volume={displayedVolume}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChangeAsset}
                                            onSelect={() => setDisplayedVolume(volume.toString())}
                                            unit={robotData.robot.subs.asset}
                                        />
                                    )) || (
                                        <ValueInput
                                            validate={getCurrencyErrors}
                                            volume={displayedCurrency}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChangeCurrency}
                                            onSelect={() => setDisplayedCurrency(volumeInCurrency.toString())}
                                            unit={robotData.robot.subs.currency}
                                        />
                                    )}
                                    <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                        ≈
                                    </span>
                                    {(volumeTypeIsAssetStatic && (
                                        <ValueInput
                                            validate={getCurrencyErrors}
                                            volume={displayedCurrency}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChangeCurrency}
                                            onSelect={() => setDisplayedCurrency(volumeInCurrency.toString())}
                                            unit={robotData.robot.subs.currency}
                                        />
                                    )) || (
                                        <ValueInput
                                            validate={getVolumeErrors}
                                            volume={displayedVolume}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChangeAsset}
                                            onSelect={() => setDisplayedVolume(volume.toString())}
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
                                        onClick={onSubmit}
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
