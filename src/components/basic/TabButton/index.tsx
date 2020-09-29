import React from "react";
import styles from "./index.module.css";

interface Props {
    title: string;
    isActive: boolean;
    handleOnClick: () => void;
    style?: React.CSSProperties;
}

export const TabButton: React.FC<Props> = ({ title, isActive, handleOnClick, style }) => {
    return (
        <div className={`${styles.btn} ${isActive && styles.isActive}`} onClick={handleOnClick} style={style}>
            <div className={`${styles.btnText} ${isActive && styles.isActive}`}>{title}</div>
        </div>
    );
};
