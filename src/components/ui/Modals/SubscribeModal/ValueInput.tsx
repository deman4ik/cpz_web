import styles from "components/ui/Modals/index.module.css";
import { Input } from "components/basic";
import React, { FC, ReactText } from "react";
import { UnitsToTypes } from "components/ui/Modals/types";

export interface ValueInputProps {
    validate?: (value?: any) => any;
    volume?: ReactText | string | number;
    width?: number;
    disabled?: boolean;
    unit: UnitsToTypes;
    customClassName?: string;
    onKeyPress: (e?: any) => void;
    onChangeText: (value: string) => void;
    onFocus?: (e?: any) => void;
    onBlur?: (e?: any) => void;
}
export const ValueInput: FC<ValueInputProps> = ({ width, validate, volume = "", customClassName, unit, ...rest }) => (
    <div className={`${styles.volume} ${customClassName || ""}`}>
        <Input
            style={{ flex: 1 }}
            type="number"
            value={volume.toString()}
            width={width || 150}
            error={validate()}
            right
            {...rest}
        />
        <span className={styles.volume_text}>{unit || ""}</span>
    </div>
);
