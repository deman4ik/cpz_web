/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, CSSProperties, forwardRef } from "react";

import { LoadingIndicator } from "../../common";
import { color } from "../../../config/constants";
import styles from "./index.module.css";

interface Props {
    checked: boolean;
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    ref?: any;
    title?: string;
}

export const CheckBox: React.FC<Props> = forwardRef(
    ({ style, checked = false, label, disabled, onClick, isLoading, title, ...rest }, ref) => {
        const handleClick = () => {
            if (!disabled) {
                if (onClick) onClick();
            }
        };

        return (
            <div className={`${styles.wrapper}  ${disabled ? styles.disabled : ""}`}>
                <label style={style} className={`${styles.container}`}>
                    {isLoading && (
                        <div className={styles.loadingContainer}>
                            <LoadingIndicator size={10} />
                        </div>
                    )}
                    <input className={styles.checkbox} type="checkbox" defaultChecked={checked} ref={ref} {...rest} />
                    <span title={title} onClick={handleClick} className={`${styles.checkmark}`} />
                </label>
                {label}
            </div>
        );
    }
);
