import React from "react";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    rows?: number;
    resizable?: boolean;
    error?: string;
    placeholder?: string;
}

export const Textarea: React.FC<Props> = ({
    value,
    onChangeText,
    rows = 2,
    resizable = false,
    error = null,
    placeholder = ""
}) => {
    const handleChange = (e) => {
        onChangeText(e.target.value);
    };

    return (
        <>
            <textarea
                value={value}
                rows={rows}
                onChange={handleChange}
                className="textarea"
                placeholder={placeholder}
            />
            <div className="errorContainer" />
            <style jsx>{`
                .textarea {
                    position: relative;
                    background-color: var(--darkBg);
                    color: var(--accent);
                    border-radius: 2px 2px ${error ? "0 0" : "2px 2px"};
                    padding: 10px;
                    overflow: hidden;
                    overflow: auto;
                    font-size: var(--normal1);
                    width: 100%;
                    height: 100%;
                    border: 1px solid transparent;
                    resize: ${resizable ? "vertical" : "none"};
                    ${error ? "border-color: var(--negative);" : ""};
                    opacity: ${value.length === 0 ? "70%" : "100%"};
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
