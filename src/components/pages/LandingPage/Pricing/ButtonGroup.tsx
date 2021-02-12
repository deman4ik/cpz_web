import React, { memo } from "react";
import { pricingContent } from "./helper";
import { ButtonPrice } from "./ButtonPrice";
import styles from "./ButtonGroup.module.css";

export const _ButtonGroup = ({ title, handleOnButton }) => {
    return (
        <div className={styles.buttonGroup}>
            {pricingContent.map((item) => (
                <ButtonPrice
                    key={item.title}
                    title={item.title}
                    classActive={item.title === title && styles.active}
                    handleOnButton={handleOnButton}
                    plan={item}
                />
            ))}
        </div>
    );
};

export const ButtonGroup = memo(_ButtonGroup);
