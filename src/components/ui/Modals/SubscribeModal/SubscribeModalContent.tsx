import React, { Dispatch, FC, SetStateAction, useEffect, useMemo } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { formatNumber, translateValue } from "components/ui/Modals/helpers";
import { ValueInput } from "components/ui/Modals/SubscribeModal/ValueInput";
import { ErrorLine } from "components/common";
import { MinimumAmount } from "components/ui/Modals/SubscribeModal/MinimumAmount";
import { SelectVolumeType } from "components/ui/Modals/SubscribeModal/SelectVolumeType";
import { Input, InputTypes, InputValues, UnitsToTypes, volumes } from "components/ui/Modals/types";

export interface SubscribeModalContentProps {
    setVolumeType: Dispatch<SetStateAction<InputTypes>>;
    setInputValues: (values: InputValues) => void;
    volumeType: InputTypes;
    parsedLimits: number[];
    robotData: any;
    onKeyPress: (e: any) => void;
    enabled: boolean;
    formError: string;
    inputs: Input[];
    inputValues: InputValues;
    validate: (type: InputTypes) => void;
}

export const SubscribeModalContent: FC<SubscribeModalContentProps> = ({
    validate,
    setVolumeType,
    volumeType,
    parsedLimits,
    robotData,
    onKeyPress,
    formError,
    enabled,
    inputs,
    inputValues,
    setInputValues
}) => {
    const [price, minAmount, , minAmountUSD] = parsedLimits;
    const asset = robotData?.robot.subs.asset;
    const onChange = (type: string) => (value: string) => {
        const newValues = { ...inputValues };
        newValues[type] = Number(value);

        Object.keys(newValues).forEach((el) => {
            if (el !== type) {
                newValues[el] = translateValue({ value, price }, type, el);
            }
        });
        setInputValues(newValues);
    };

    const areValuesEmpty = () => Object.values(inputValues).filter((i) => i === 0 || !!i).length === 0;

    useEffect(() => {
        if (robotData && parsedLimits.length && areValuesEmpty()) {
            const { settings: robotSettings } = robotData.robot.subs;
            const { volumeType: robotVolumeType } = robotSettings;
            const volumeByType = volumes[robotVolumeType];
            onChange(robotVolumeType)(robotSettings[volumeByType]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robotData, parsedLimits]);

    const volumeTypeDescriptions = useMemo(
        () => ({
            assetStatic: `All positions trading amount will be fixed in ${asset}`,
            currencyDynamic: `All positions trading amount will be fixed in ${robotData?.robot.subs.currency}`
        }),
        [asset, robotData]
    );

    const getFormattedValue = (type) => formatNumber(Number(inputValues[type]));
    return (
        <>
            <ErrorLine formError={formError} />
            <div className={styles.container}>
                <div className={styles.bodyTitle}>Select amount type and enter desired trading amount</div>
                <div className={styles_subs.form}>
                    <MinimumAmount asset={robotData ? asset : ""} minAmount={minAmount} minAmountUSD={minAmountUSD} />
                    <SelectVolumeType
                        volumeTypeDescription={volumeTypeDescriptions[volumeType]}
                        enabled={enabled}
                        onChangeVolumeType={setVolumeType}
                        volumeType={volumeType}
                    />
                    <div className={styles_subs.fieldset}>
                        <div className={styles.input_group}>
                            <ValueInput /*main input*/
                                validate={() => validate(volumeType)}
                                volume={getFormattedValue(volumeType)}
                                onKeyPress={onKeyPress}
                                onChangeText={onChange(volumeType)}
                                unit={UnitsToTypes[volumeType]}
                            />
                            <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                ≈
                            </span>
                            {inputs
                                .filter((i) => i.type !== volumeType)
                                .map((input) => {
                                    const { type } = input;
                                    return (
                                        <ValueInput
                                            key={`subscribe-${type}`}
                                            validate={() => validate(type)}
                                            volume={getFormattedValue(type)}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChange(type)}
                                            unit={UnitsToTypes[type]}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
