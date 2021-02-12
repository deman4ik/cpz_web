import React, { memo } from "react";
import styles from "./ButtonPrice.module.css";

const _ButtonPrice = ({ title, classActive, handleOnButton, plan }) => {
    return (
        <a className={`${styles.button} ${classActive ? styles.active : ""}`} onClick={() => handleOnButton(plan)}>
            {title}
        </a>
    );
};

export const ButtonPrice = memo(_ButtonPrice);
