import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { formatNumber, translateValue } from "components/ui/Modals/helpers";
import { ValueInput } from "components/ui/Modals/SubscribeModal/ValueInput";
import { ErrorLine } from "components/common";
import { MinimumAmount } from "components/ui/Modals/SubscribeModal/MinimumAmount";
import { SelectVolumeType } from "components/ui/Modals/SubscribeModal/SelectVolumeType";
import { InputMap, InputTypes, InputValues, UnitsToTypes, volumes, VolumeTypeOption } from "components/ui/Modals/types";
import { MainInput } from "components/ui/Modals/SubscribeModal/MainInput";
import { Delimiter } from "components/common/Delimiter";

export interface SubscribeModalContentProps {
    setVolumeType: Dispatch<SetStateAction<InputTypes>>;
    setInputValues: (values: InputValues) => void;
    volumeType: InputTypes;
    parsedLimits: number[];
    robotData: any;
    onKeyPress: (e: any) => void;
    enabled: boolean;
    formError: string;
    inputs: InputMap;
    inputValues: InputValues;
    validate: (type: InputTypes) => void;
    volumeTypeOptions: VolumeTypeOption[];
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
    setInputValues,
    volumeTypeOptions
}) => {
    const [price, minAmount, , minAmountUSD, , balance] = parsedLimits;
    const [displayedValues, setDisplayedValues] = useState(inputValues);
    const asset = robotData?.robot.subs.asset;
    const selectedInputs = inputs[volumeType];

    const minVals = {
        [InputTypes.assetStatic]: minAmount,
        [InputTypes.assetDynamicDelta]: minAmount,
        [InputTypes.currencyDynamic]: minAmountUSD
    };

    const onChange = (type: string) => (value: string) => {
        const newValues = { ...inputValues };
        const newDisplayedValues = { ...displayedValues };

        newValues[type] = Number(value);
        newDisplayedValues[type] = value;

        Object.keys(newValues)
            .filter((i) => i !== type) // we just set value of the type
            .forEach((el) => {
                const newValue = translateValue({ value, price, balance }, type, el) || minVals[el];
                newValues[el] = newValue;
                newDisplayedValues[el] = formatNumber(newValue);
            });
        setInputValues(newValues);
        setDisplayedValues(newDisplayedValues);
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
            [InputTypes.balancePercent]: `All positions trading amount will be fixed in percents of user's balance`,
            [InputTypes.assetStatic]: `All positions trading amount will be fixed in ${asset}`,
            [InputTypes.assetDynamicDelta]: `All positions trading amount will be fixed in ${asset}`,
            [InputTypes.currencyDynamic]: `All positions trading amount will be fixed in ${robotData?.robot.subs.currency}`
        }),
        [asset, robotData]
    );

    const notSelectedAndNotPercentage = (i) => ![volumeType, InputTypes.balancePercent].includes(i.type);
    return (
        <>
            <ErrorLine formError={formError} />
            <div className={styles.container}>
                <div className={styles.bodyTitle}>Select amount type and enter desired trading amount</div>
                <div className={styles_subs.form}>
                    <MinimumAmount asset={robotData ? asset : ""} minAmount={minAmount} minAmountUSD={minAmountUSD} />
                    <SelectVolumeType
                        width={230}
                        volumeTypeOptions={volumeTypeOptions}
                        volumeTypeDescription={volumeTypeDescriptions[volumeType]}
                        enabled={enabled}
                        onChangeVolumeType={setVolumeType}
                        volumeType={volumeType}
                    />
                    <div className={styles_subs.fieldset}>
                        <div className={styles.input_group}>
                            <MainInput
                                width={180}
                                showDelimiter={false}
                                validate={() => validate(volumeType)}
                                volume={displayedValues[volumeType]}
                                onKeyPress={onKeyPress}
                                onChangeText={onChange(volumeType)}
                                unit={UnitsToTypes[volumeType]}
                            />
                            {selectedInputs.filter(notSelectedAndNotPercentage).map((input, i) => {
                                const { type } = input;
                                return (
                                    <div key={`subscribe-${type}`} className={styles.input_container}>
                                        <Delimiter />
                                        <ValueInput
                                            width={180}
                                            key={`subscribe-${type}`}
                                            validate={() => validate(type)}
                                            volume={displayedValues[type]}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChange(type)}
                                            unit={UnitsToTypes[type]}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
