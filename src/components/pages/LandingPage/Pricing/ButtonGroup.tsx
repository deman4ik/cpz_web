import React, { memo } from "react";
import { pricingContent } from "./helper";
import styles from "./ButtonGroup.module.css";

const Button = ({ classActive, title, handleButton }) => {
    return (
        <a className={`${styles.button} ${classActive}`} onClick={(e) => handleButton(e.currentTarget)}>
            {title}
        </a>
    );
};

export const _ButtonGroup = ({ title, handleButton }) => {
    return (
        <div className={styles.buttonGroup}>
            {pricingContent.map((item) => (
                <Button
                    key={item.title}
                    title={item.title}
                    classActive={item.title === title && styles.active}
                    handleButton={handleButton}
                />
            ))}
        </div>
    );
};

export const ButtonGroup = memo(_ButtonGroup);
