import React from "react";
import styles from "./index.module.css";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    rows?: number;
    resizable?: boolean;
    error?: string;
}

export const Textarea: React.FC<Props> = ({ value, onChangeText, rows = 2, resizable = false, error = null }) => {
    const handleOnChange = (e) => {
        onChangeText(e.target.value);
    };

    return (
        <>
            <textarea
                value={value}
                rows={rows}
                onChange={handleOnChange}
                className="textarea"
                style={{ resize: resizable ? "vertical" : "none" }}
            />
            <div className="errorContainer" />
            <style jsx>{`
                .textarea {
                    position: relative;
                    background-color: var(--darkBg);
                    color: var(--accent);
                    border-radius: 2px 2px ${error ? "0 0" : "2px 2px"};
                    padding: 11px;
                    overflow: hidden;
                    font-size: var(--normal1);
                    width: 100%;
                    min-height: 100px;
                    border: 1px solid transparent;
                    ${error ? "border-color: var(--negative);" : ""}
                }
                .errorContainer {
                    width: 100%;
                }
                .errorContainer::after {
                    width: 100%;
                    display: ${error ? "block" : "none"};
                    content: "${error}";
                    background-color: var(--negative);
                }
            `}</style>
        </>
    );
};
