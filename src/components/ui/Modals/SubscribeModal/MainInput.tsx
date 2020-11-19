import React, { FC } from "react";
import { ValueInput, ValueInputProps } from "components/ui/Modals/SubscribeModal/ValueInput";
import { Delimiter } from "components/common/Delimiter";

interface MainInputProps extends ValueInputProps {
    showDelimiter: boolean;
}
export const MainInput: FC<MainInputProps> = ({ showDelimiter, ...rest }) => {
    return (
        <>
            <ValueInput {...rest} />
            {showDelimiter && <Delimiter />}
        </>
    );
};
