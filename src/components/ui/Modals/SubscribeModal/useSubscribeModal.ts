import { useEffect, useMemo, useState } from "react";
import { InputMap, InputTypes, InputValues, Precision } from "components/ui/Modals/types";
import {
    AssetTypes,
    CurrencyTypes,
    DEFAULT_PRECISION,
    getInputValues,
    parseLimits,
    precisionToVolumeMap,
    translateValue,
    validateVolume
} from "components/ui/Modals/helpers";
import { volumeTypeOptions, volumeTypeOptionsMap } from "../constants";
import { LimitsType, RobotDataType } from "../types";
import { LOGIN } from "graphql/auth/mutations";

interface UseSubscribeModalProps {
    limits: LimitsType;
    inputs: InputMap;
    robotData?: RobotDataType;
}

const INITIAL_VALUES = { balancePercent: "", currencyDynamic: "", assetStatic: "", assetDynamicDelta: "" };

export const useSubscribeModal = ({ limits, inputs, robotData }: UseSubscribeModalProps): any => {
    const DEFAULT_VOLUME_TYPE =
        volumeTypeOptionsMap[robotData?.robot.subs.settings.volumeType] || volumeTypeOptions[0].value;

    const [volumeType, setVolumeType] = useState<InputTypes>(DEFAULT_VOLUME_TYPE);
    const getPrecision = () => (limits && limits.precision) || DEFAULT_PRECISION;
    const selectedInputs = inputs[volumeType];
    const [inputValues, setInputValues] = useState<InputValues>(INITIAL_VALUES);
    const [precision, setPrecision] = useState<Precision>(getPrecision());

    useEffect(() => {
        setPrecision(getPrecision());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volumeType, limits]);

    useEffect(() => {
        setVolumeType(DEFAULT_VOLUME_TYPE);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robotData]);

    const parsedLimits = useMemo(() => parseLimits(limits), [limits]);
    const { price, minAmount, minAmountUSD, balance, availableBalancePercent, usedBalancePercent } = parsedLimits;
    const usedAccountPercent = Math.ceil(usedBalancePercent - (robotData?.robot.subs.settings.balancePercent || 0));
    const currentBalancePercent =
        DEFAULT_VOLUME_TYPE === InputTypes.balancePercent
            ? availableBalancePercent + (robotData?.robot.subs.settings.balancePercent || 0)
            : availableBalancePercent;

    const { currencyDynamic, assetStatic } = InputTypes;
    const currentVolumeTypeInCurrency = CurrencyTypes.includes(volumeType);
    const currentVolumeTypeInAsset = AssetTypes.includes(volumeType);

    const getPercent = (amountUSD) => Math.ceil(Number((amountUSD / balance) * 100));

    const getTranslatedValue = (value, from, to) => translateValue({ value, price }, from, to);

    const calculateAmounts = (amountUSD, amount) => {
        let result;
        if (currentVolumeTypeInCurrency) {
            const assetValue = getTranslatedValue(amountUSD, currencyDynamic, assetStatic);
            result = getInputValues(assetValue, amountUSD, assetValue, getPercent(amountUSD));
        } else if (currentVolumeTypeInAsset) {
            const currencyValue = Number(getTranslatedValue(amount, assetStatic, currencyDynamic).toFixed());
            result = getInputValues(amount, currencyValue, amount, getPercent(currencyValue));
        }
        return result;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const minAmounts = useMemo(() => calculateAmounts(minAmountUSD, minAmount), [volumeType, parsedLimits]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const maxAmounts = {}; //useMemo(() => calculateAmounts(maxAmountUSD, maxAmount), [volumeType, parsedLimits]);

    const validate = (type: InputTypes) => {
        // eslint-disable-next-line eqeqeq
        const valuesEmpty = inputValues && Object.values(inputValues).filter((i) => i == 0 || i).length === 0;
        if (!valuesEmpty) {
            return validateVolume({
                precision: precision[precisionToVolumeMap[type]],
                used_percent: usedAccountPercent,
                type,
                value: inputValues[type],
                maxAmount: type === InputTypes.balancePercent ? currentBalancePercent : maxAmounts[type],
                minAmount: minAmounts[type]
            });
        }
        return false;
    };

    const getErrors = () => selectedInputs.map((input) => validate(input.type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const errors = useMemo(() => getErrors().filter((i) => i), [inputValues, volumeType]);

    return {
        inputValues,
        setInputValues,
        parsedLimits,
        minAmounts,
        precision,
        maxAmounts,
        usedAccountPercent,
        validate,
        volumeType,
        setVolumeType,
        errors
    };
};
