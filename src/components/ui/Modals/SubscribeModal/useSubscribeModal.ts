import { useState } from "react";
import { Input, InputTypes, InputValues } from "components/ui/Modals/types";
import {
    getMaxAmounts,
    getMinAmounts,
    parseLimits,
    validateVolume,
    volumeTypeOptions
} from "components/ui/Modals/helpers";

interface UseSubscribeModalProps {
    limits: any;
    inputs: Input[];
}
export function useSubscribeModal({ limits, inputs }: UseSubscribeModalProps) {
    const [inputValues, setInputValues] = useState<InputValues>({ assetStatic: "", currencyDynamic: "" });
    const [volumeType, setVolumeType] = useState<InputTypes>(volumeTypeOptions[0].value);

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
        return inputs.map((input) => validate(input.type));
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
