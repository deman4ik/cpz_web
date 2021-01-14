import React from "react";
import styles from "./index.module.css";

interface Props {
    title: string;
    isActive: boolean;
    handleOnClick: () => void;
    style?: React.CSSProperties;
    maxTextWidth?: number;
}

export const TabButton: React.FC<Props> = ({ title, isActive, handleOnClick, style, maxTextWidth }) => {
    return (
        <div
            className={`${styles.btn} ${isActive && styles.isActive}`}
            onClick={handleOnClick}
            style={{ maxWidth: maxTextWidth || "unset", ...style }}>
            {title}
        </div>
    );
};
