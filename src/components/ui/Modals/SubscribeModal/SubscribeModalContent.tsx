import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { ValueInput } from "components/ui/Modals/SubscribeModal/ValueInput";
import { ErrorLine } from "components/common";
import { MinimumAmount } from "components/ui/Modals/SubscribeModal/MinimumAmount";
import { SelectVolumeType } from "components/ui/Modals/SubscribeModal/SelectVolumeType";
import { InputMap, InputTypes, InputValues, UnitsToTypes, volumes, VolumeTypeOption } from "components/ui/Modals/types";
import { MainInput } from "components/ui/Modals/SubscribeModal/MainInput";
import { Delimiter } from "components/common/Delimiter";
import { VolumeDescription } from "components/ui/Modals/SubscribeModal/VollumeDescription";
import { formatNumber, translateValue } from "components/ui/Modals/helpers";

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
    minAmounts: { [key in InputTypes]?: number };
    inputValues: InputValues;
    validate: (type: InputTypes) => void;
    volumeTypeOptions: VolumeTypeOption[];
}
const SELECT_AMOUNT = "Select amount type and enter desired trading amount";
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
    minAmounts,
    volumeTypeOptions
}) => {
    const [price, , , , , balance] = parsedLimits;

    const [displayedValues, setDisplayedValues] = useState(inputValues);
    const asset = robotData?.robot.subs.asset;
    const currency = robotData?.robot.subs.currency;
    const selectedInputs = inputs[volumeType];

    const onChange = (type: string) => (value: string) => {
        const newValues = { ...inputValues };
        const newDisplayedValues = { ...displayedValues };

        newValues[type] = Number(value);
        newDisplayedValues[type] = value;

        Object.keys(newValues)
            .filter((i) => i !== type)
            .forEach((el) => {
                const newValue = translateValue({ value, price, balance }, type, el);
                newValues[el] = newValue;
                newDisplayedValues[el] = formatNumber(newValue);
            });
        setInputValues(newValues);
        setDisplayedValues(newDisplayedValues);
    };

    const areValuesEmpty = () => Object.values(inputValues).filter((i) => i === 0 || !!i).length === 0;

    useEffect(() => {
        if (robotData && parsedLimits.length && areValuesEmpty()) {
            const { settings: robotSettings } = robotData?.robot.subs;
            const { volumeType: robotVolumeType } = robotSettings;

            const volumeByType = volumes[robotVolumeType];
            onChange(robotVolumeType)(robotSettings[volumeByType]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robotData, parsedLimits]);

    const notSelectedAndNotPercentage = (i) => ![volumeType, InputTypes.balancePercent].includes(i.type);
    return (
        <>
            <ErrorLine formError={formError} />
            <div className={styles.container}>
                <div className={styles.bodyTitle}>{SELECT_AMOUNT}</div>
                <div className={styles_subs.form}>
                    <SelectVolumeType
                        width={230}
                        volumeTypeOptions={volumeTypeOptions}
                        enabled={enabled}
                        onChangeVolumeType={setVolumeType}
                        volumeType={volumeType}
                    />
                    <div className={styles_subs.fieldset}>
                        <div className={styles.input_group}>
                            <MainInput
                                disabled={!enabled}
                                customClassName={styles.modalInput}
                                width={180}
                                showDelimiter={false}
                                validate={() => validate(volumeType)}
                                volume={displayedValues[volumeType]}
                                onKeyPress={onKeyPress}
                                onChangeText={onChange(volumeType)}
                                unit={UnitsToTypes[volumeType]}
                            />
                            <VolumeDescription volumeType={volumeType} asset={asset} currency={currency} />
                            <MinimumAmount
                                volumeType={volumeType}
                                asset={robotData ? asset : ""}
                                minAmount={minAmounts[InputTypes.assetStatic]}
                                minAmountUSD={minAmounts[InputTypes.currencyDynamic]}
                            />
                            {selectedInputs.filter(notSelectedAndNotPercentage).map((input, i) => {
                                const { type } = input;
                                return (
                                    <div key={`subscribe-${type}`} className={styles.input_container}>
                                        {i >= 1 && <Delimiter />}
                                        <ValueInput
                                            disabled={!enabled}
                                            customClassName={styles.modalInput}
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
