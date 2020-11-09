import React, { FC } from "react";
import { ValueInput, ValueInputProps } from "components/ui/Modals/SubscribeModal/ValueInput";
import { Delimiter } from "components/common/Delimiter";

interface MainInputProps extends ValueInputProps {
    showDelimiter: boolean;
}
export const MainInput: FC<MainInputProps> = ({ validate, volume, onKeyPress, onChangeText, unit, showDelimiter }) => {
    return (
        <>
            <ValueInput /*main input*/
                validate={validate}
                volume={volume}
                onKeyPress={onKeyPress}
                onChangeText={onChangeText}
                unit={unit}
            />
            {showDelimiter && <Delimiter />}
        </>
    );
};
