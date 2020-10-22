import React, { useState, useEffect, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { SUBSCRIBE } from "graphql/local/mutations";
import { Button, Input, Select } from "components/basic";
import { formatMoney } from "config/utils";
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

const _SubscribeModal: React.FC<Props> = ({ type, setTitle, onClose }) => {
    const [formError, setFormError] = useState("");
    const { data: dataRobot } = useQuery(ROBOT);

    const volumeTypeDescriptions = useMemo(
        () => ({
            assetStatic: `All positions trading amount will be fixed in ${dataRobot.robot.subs.asset}`,
            currencyDynamic: `All positions trading amount will be fixed in ${dataRobot.robot.subs.currency}`
        }),
        [dataRobot]
    );

    const [inputVolumeAsset, setInputVolumeAsset] = useState("0");
    const [inputVolumeCurrency, setInputVolumeCurrency] = useState("0");
    const [volumeType, setVolumeType] = useState(volumeTypeOptions[0].value);

    const { data, loading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: !dataRobot ? null : dataRobot.robot.subs.exchange,
            asset: !dataRobot ? null : dataRobot.robot.subs.asset,
            currency: !dataRobot ? null : dataRobot.robot.subs.currency
        },
        skip: !dataRobot
    });

    const [subscribe, { loading: subscribeLoading }] = useMutation(SUBSCRIBE_TO_SIGNALS);
    const [cacheSubscription] = useMutation(SUBSCRIBE);

    const limits = useMemo(() => !loading && data && getLimitsForSignal(data), [loading, data]);

    const handleOnChangeAsset = (value: string) => {
        setInputVolumeAsset(value);
        setInputVolumeCurrency(calculateCurrency(value, limits.price));
    };

    const handleOnChangeCurrency = (value: string) => {
        setInputVolumeCurrency(value);
        setInputVolumeAsset(calculateAsset(value, limits.price));
    };

    useEffect(() => {
        console.log(dataRobot);
        if (dataRobot) {
            setInputVolumeAsset(dataRobot.robot.subs.volume);
            setInputVolumeCurrency(calculateCurrency(dataRobot.robot.subs.volume, limits.price));
            setTitle(
                dataRobot.robot.subs.volume
                    ? `Follow ${dataRobot.robot.name}`
                    : `Subscribe to ${dataRobot.robot.name} signals`
            );
        }
    }, [setTitle, dataRobot, limits]);

    const handleOnSubmit = () => {
        subscribe({
            variables: {
                robotId: dataRobot.robot.id,
                settings: buildSettings({ volumeType, volume: inputVolumeAsset, currency: inputVolumeCurrency })
            }
        }).then((response) => {
            if (response.data.userSignalSubscribe.result === "OK") {
                cacheSubscription({
                    variables: {
                        cache: dataRobot.robot.cache,
                        volume: Number(inputVolumeAsset),
                        type,
                        chartData: dataRobot.ChartData
                    }
                });
                if (type !== "edit") {
                    event({
                        action: "subscribe",
                        category: "Signals",
                        label: "subscribe",
                        value: dataRobot.robot.id
                    });
                }
            } else {
                setFormError(response.data.userSignalSubscribe.result);
            }
            onClose();
        });
    };

    const isValid = () =>
        Number(inputVolumeAsset) >= limits.asset.min.amount && Number(inputVolumeAsset) <= limits.asset.max.amount;

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter" && isValid()) {
            handleOnSubmit();
        }
    };

    const VolumeInput = () => (
        <div className={styles.volume}>
            <Input
                type="number"
                value={`${inputVolumeAsset}`}
                width={150}
                error={!isValid()}
                right
                onKeyPress={handleOnKeyPress}
                onChangeText={handleOnChangeAsset}
            />
            <span className={styles.volume_text}>{dataRobot ? dataRobot.robot.subs.asset : ""}</span>
        </div>
    );
    const CurrencyInput = () => (
        <div className={styles.volume} style={{ marginTop: 3 }}>
            <Input
                type="number"
                value={`${inputVolumeCurrency}`}
                width={150}
                right
                onKeyPress={handleOnKeyPress}
                onChangeText={handleOnChangeCurrency}
            />
            <span className={styles.volume_text}>$</span>
        </div>
    );
    // TODO: return a Modal component instead of this nonsense
    return (
        <>
            {loading || subscribeLoading || !dataRobot ? (
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
                                            {dataRobot ? dataRobot.robot.subs.asset : ""}
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
                                    {(volumeType === "assetStatic" && <VolumeInput />) || <CurrencyInput />}
                                    <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                        ≈
                                    </span>
                                    {(volumeType === "assetStatic" && <CurrencyInput />) || <VolumeInput />}
                                </div>
                                <div className={styles_subs.btns}>
                                    <Button
                                        className={styles.btn}
                                        title={type === "edit" ? "Apply" : "OK"}
                                        icon="check"
                                        type="success"
                                        disabled={!isValid()}
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
