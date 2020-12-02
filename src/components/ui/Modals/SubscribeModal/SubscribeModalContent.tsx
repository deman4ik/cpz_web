import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { ValueInput } from "components/ui/Modals/SubscribeModal/ValueInput";
import { ErrorLine } from "components/common";
import { MinimumAmount } from "components/ui/Modals/SubscribeModal/MinimumAmount";
import { SelectVolumeType } from "components/ui/Modals/SubscribeModal/SelectVolumeType";
import {
    InputMap,
    InputTypes,
    InputValues,
    Precision,
    UnitsToTypes,
    volumes,
    VolumeTypeOption
} from "components/ui/Modals/types";
import { MainInput } from "components/ui/Modals/SubscribeModal/MainInput";
import { Delimiter } from "components/common/Delimiter";
import { VolumeDescription } from "components/ui/Modals/SubscribeModal/VollumeDescription";
import {
    AssetTypes,
    formatNumber,
    isObjectEmpty,
    ParsedLimits,
    precisionToVolumeMap,
    translateValue
} from "components/ui/Modals/helpers";
import { PercentsAvailable } from "components/ui/Modals/SubscribeModal/PercentnsAvailable";

export interface SubscribeModalContentProps {
    setVolumeType: Dispatch<SetStateAction<InputTypes>>;
    setInputValues: (values: InputValues) => void;
    volumeType: InputTypes;
    parsedLimits: ParsedLimits;
    robotData: any;
    precision: Precision;
    usedAccountPercent: number;
    onKeyPress: (e: any) => void;
    enabled: boolean;
    formError?: string;
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
    usedAccountPercent,
    inputs,
    precision,
    inputValues,
    setInputValues,
    minAmounts,
    volumeTypeOptions
}) => {
    const { price, balance, maxPercentAmount } = parsedLimits;

    const [displayedValues, setDisplayedValues] = useState(inputValues);
    const asset = robotData?.robot.subs.asset;
    const currency = robotData?.robot.subs.currency;
    const selectedInputs = inputs[volumeType];

    const onChange = (type: string) => (value: string) => {
        const newValues = { ...inputValues };
        const newDisplayedValues = { ...displayedValues };

        const numValue = Number(value);
        newValues[type] = numValue;
        newDisplayedValues[type] = formatNumber(numValue, precision[precisionToVolumeMap[type]]);

        Object.keys(newValues)
            .filter((i) => i !== type)
            .forEach((el) => {
                const newValue = translateValue({ value, price, balance }, type, el) || 0;
                newValues[el] = newValue;
                newDisplayedValues[el] = Number(newValue.toFixed(precision[precisionToVolumeMap[el]])) || 0;
            });
        setInputValues(newValues);
        setDisplayedValues(newDisplayedValues);
    };

    useEffect(() => {
        if (robotData && !isObjectEmpty(parsedLimits) && isObjectEmpty(inputValues)) {
            const { settings: robotSettings } = robotData?.robot.subs;
            const { volumeType: robotVolumeType } = robotSettings;

            const volumeByType = volumes[robotVolumeType];
            onChange(robotVolumeType)(robotSettings[volumeByType]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robotData, parsedLimits]);

    const getUnit = (type) => AssetTypes.includes(type) && asset;

    const notSelectedAndNotPercentage = (i) => ![volumeType, InputTypes.balancePercent].includes(i.type);
    return (
        <>
            {formError && <ErrorLine formError={formError} />}
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
                    <VolumeDescription volumeType={volumeType} asset={asset} currency={currency} />
                    <PercentsAvailable
                        usedAccountPercent={usedAccountPercent}
                        volumeType={volumeType}
                        maxPercentAmount={maxPercentAmount}
                    />
                    <MinimumAmount
                        balance={balance}
                        volumeType={volumeType}
                        asset={robotData ? asset : ""}
                        minAmount={minAmounts[InputTypes.assetStatic]}
                        minAmountUSD={minAmounts[InputTypes.currencyDynamic]}
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
                                unit={getUnit(volumeType)}
                            />
                            {volumeType === InputTypes.balancePercent && (
                                <PercentsAvailable
                                    maxPercentAmount={maxPercentAmount}
                                    usedAccountPercent={usedAccountPercent}
                                    volumeType={volumeType}
                                    short
                                />
                            )}
                            {selectedInputs.filter(notSelectedAndNotPercentage).map((input, i) => {
                                const { type } = input;
                                return (
                                    <div key={`subscribe-${type}`} className={styles.input_container}>
                                        <Delimiter first={i === 0} />
                                        <ValueInput
                                            disabled={!enabled}
                                            customClassName={styles.modalInput}
                                            width={180}
                                            key={`subscribe-${type}`}
                                            validate={() => validate(type)}
                                            volume={displayedValues[type]}
                                            onKeyPress={onKeyPress}
                                            onChangeText={onChange(type)}
                                            unit={getUnit(type)}
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
