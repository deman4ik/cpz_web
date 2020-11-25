import React from "react";
import styles from "./index.module.css";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    rows?: number;
    resizable?: boolean;
}

export const Textarea: React.FC<Props> = ({ value, onChangeText, rows = 2, resizable = false }) => {
    const handleOnChange = (e) => {
        onChangeText(e.target.value);
    };

    return (
        <textarea
            value={value}
            rows={rows}
            onChange={handleOnChange}
            className={styles.textarea}
            style={{ resize: resizable ? "vertical" : "none" }}
        />
    );
};
