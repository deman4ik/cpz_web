import { useEffect, useState } from "react";
import { Input, InputMap, InputTypes, InputValues } from "components/ui/Modals/types";
import { getMaxAmounts, getMinAmounts, parseLimits, validateVolume } from "components/ui/Modals/helpers";
import { volumeTypeOptions } from "../constants";

interface UseSubscribeModalProps {
    limits: any;
    inputs: InputMap;
}
const getInitialValues = (inputs: Input[]) =>
    inputs.reduce((a, v) => {
        // eslint-disable-next-line no-param-reassign
        a[v.type] = "";
        return a;
    }, {});

export function useSubscribeModal({ limits, inputs }: UseSubscribeModalProps) {
    const [volumeType, setVolumeType] = useState<InputTypes>(volumeTypeOptions[0].value);
    const selectedInputs = inputs[volumeType];
    const [inputValues, setInputValues] = useState<InputValues>(getInitialValues(selectedInputs));

    useEffect(() => {
        setInputValues(getInitialValues(selectedInputs));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volumeType]);

    const parsedLimits = parseLimits(limits);
    const minAmounts = getMinAmounts(parsedLimits);
    const maxAmounts = getMaxAmounts(parsedLimits);

    const validate = (type: InputTypes) => {
        return validateVolume({
            type,
            value: inputValues[type],
            maxAmount: maxAmounts[type],
            minAmount: minAmounts[type]
        });
    };

    const getErrors = () => {
        return selectedInputs.map((input) => validate(input.type));
    };
    const errors = getErrors().filter((i) => i);

    return {
        inputValues,
        setInputValues,
        parsedLimits,
        minAmounts,
        maxAmounts,
        validate,
        volumeType,
        setVolumeType,
        errors
    };
}