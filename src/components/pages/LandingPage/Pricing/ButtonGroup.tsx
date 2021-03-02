import React, { memo } from "react";
import styles from "./ButtonGroup.module.css";

const Button = ({ classActive, period, free, handleOnButton }) => {
    return (
        <a className={`${styles.button} ${classActive}`} onClick={(e) => handleOnButton(e.currentTarget)}>
            {period.name}
            {free && period && period.free !== null && (
                <p className={styles.free}>
                    {period.free} month{period.free > 1 && `s`} free
                </p>
            )}
        </a>
    );
};

export const _ButtonGroup = ({ buttonName, options, free, handleOnButton, style }: any): any => {
    return (
        <div className={styles.buttonGroup} style={style}>
            {options.map((item) => (
                <Button
                    key={item.name}
                    period={{ name: item.name, unit: item.unit, free: item.free_months }}
                    free={free}
                    classActive={item.name === buttonName && styles.active}
                    handleOnButton={() => handleOnButton(item)}
                />
            ))}
        </div>
    );
};

export const ButtonGroup = memo(_ButtonGroup);
