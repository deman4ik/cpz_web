import React, { memo } from "react";
import styles from "./ButtonGroup.module.css";

const Button = ({ classActive, period, handleButton }) => {
    return (
        <a className={`${styles.button} ${classActive}`} onClick={(e) => handleButton(e.currentTarget)}>
            {period.name}
            {period && period.free !== null && (
                <p className={styles.free}>
                    {period.free} month{period.free > 1 && `s`} free
                </p>
            )}
        </a>
    );
};

export const _ButtonGroup = ({ buttonName, options, handleButton, style }: any): any => {
    return (
        <div className={styles.buttonGroup} style={style}>
            {options.map((item) => (
                <Button
                    key={item.name}
                    period={{ name: item.name, unit: item.unit, free: item.free_months }}
                    classActive={item.name === buttonName && styles.active}
                    handleButton={() => handleButton(item)}
                />
            ))}
        </div>
    );
};

export const ButtonGroup = memo(_ButtonGroup);
