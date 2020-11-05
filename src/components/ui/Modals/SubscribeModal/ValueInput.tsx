import styles from "components/ui/Modals/index.module.css";
import { Input, InputProps } from "components/basic";
import React, { FC, ReactText } from "react";
import { UnitsToTypes } from "components/ui/Modals/types";

export interface ValueInputProps {
    validate?: (value?: any) => any;
    volume?: ReactText | string | number;
    unit: UnitsToTypes;
    onKeyPress: (e?: any) => void;
    onChangeText: (value: string) => void;
    onFocus?: (e?: any) => void;
    onBlur?: (e?: any) => void;
}
export const ValueInput: FC<ValueInputProps> = ({
    validate,
    volume = "",
    onKeyPress,
    onChangeText,
    onFocus,
    onBlur,
    unit
}) => (
    <div className={styles.volume}>
        <Input
            type="number"
            value={volume.toString()}
            width={150}
            error={validate()}
            right
            onKeyPress={onKeyPress}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
        />
        <span className={styles.volume_text}>{unit || ""}</span>
    </div>
);
