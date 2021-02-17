import React, { memo } from "react";
import styles from "./ButtonGroup.module.css";

const Button = ({ classActive, title, handleButton }) => {
    return (
        <a className={`${styles.button} ${classActive}`} onClick={(e) => handleButton(e.currentTarget)}>
            {title}
        </a>
    );
};

export const _ButtonGroup = ({ title, options, handleButton }) => {
    return (
        <div className={styles.buttonGroup}>
            {options.map((item) => (
                <Button
                    key={item.name}
                    title={item.name}
                    classActive={item.name === title && styles.active}
                    handleButton={() => handleButton(item)}
                />
            ))}
        </div>
    );
};

export const ButtonGroup = memo(_ButtonGroup);
