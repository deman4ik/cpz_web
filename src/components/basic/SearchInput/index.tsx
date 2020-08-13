import React from "react";

import { color } from "config/constants";
import { CloseIcon, MagnifyIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    value: string;
    onChange: (str: string) => void;
    placeholder: string;
    style?: React.CSSProperties;
}

export const SearchInput: React.FC<Props> = ({ value, onChange, placeholder, style }) => {
    const handleOnChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.wrapper} style={style}>
            <div className={styles.container}>
                {value.length ? (
                    <div className={[styles.icon, styles.pointer].join(" ")} onClick={() => onChange("")}>
                        <CloseIcon color={color.accent} size={16} />
                    </div>
                ) : (
                    <div className={styles.icon}>
                        <MagnifyIcon color={color.accent} size={16} />
                    </div>
                )}
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={placeholder || "Search..."}
                    onChange={handleOnChange}
                    value={value}
                />
            </div>
        </div>
    );
};
