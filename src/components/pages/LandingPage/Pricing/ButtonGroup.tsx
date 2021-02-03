import React from "react";
import styles from "./ButtonGroup.module.css";

const Button = ({ classActive, title, handleButton }) => {
    return (
        <a className={`${styles.button} ${classActive}`} onClick={() => handleButton(title)}>
            {title}
        </a>
    );
};

export const ButtonGroup = ({ buttons, title, handleButton }) => {
    return (
        <div className={styles.buttonGroup}>
            {buttons.map((buttonTitle) => (
                <Button
                    key={buttonTitle}
                    title={buttonTitle}
                    classActive={buttonTitle === title ? styles.active : ""}
                    handleButton={handleButton}
                />
            ))}
        </div>
    );
};
