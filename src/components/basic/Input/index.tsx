import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "../Button";

export interface InputProps {
    value: string;
    icon?: string;
    placeholder?: string;
    label?: string;
    buttonTitle?: string;
    maxLength?: number;
    type?: string;
    onChangeText?: (value) => void;
    onKeyPress?: (e: any) => void;
    onClickButton?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    width?: number;
    responsive?: boolean;
    error?: string | boolean;
    // onSelect?: (e: any) => void;
    selectTextOnFocus?: boolean;
    readonly?: boolean;
    style?: CSSProperties;
    right?: boolean;
    disabled?: boolean;
    autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
    value,
    icon,
    placeholder,
    label,
    buttonTitle,
    type = "text",
    onChangeText,
    onClickButton,
    style,
    right,
    onKeyPress,
    width = 350,
    error,
    // onSelect,
    selectTextOnFocus,
    responsive,
    readonly,
    maxLength = 30,
    autoComplete = "hidden",
    disabled,
    onFocus,
    onBlur
}) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);
    const handleOnInput = (e) => {
        if (type === "number") {
            e.target.value = e.target.value.toString().replace(/,/g, "").slice(0, 8);
        }
        if (onChangeText) {
            onChangeText(e.target.value);
        }
        setInputValue(e.target.value);
    };

    const formatInput = (e) => {
        if (onKeyPress) onKeyPress(e);
    };

    const getInputClass = () => {
        const styleInput = ["input"];
        if (error) styleInput.push("error");
        if (right) styleInput.push("right");
        if (disabled) styleInput.push("disabled");
        return styleInput;
    };

    const handleOnFocus = () => {
        if (onFocus) {
            onFocus();
        }
        if (selectTextOnFocus && inputValue) {
            inputRef?.current?.setSelectionRange(0, inputValue.length);
        }
    };

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const inputProps = {
        className: getInputClass().join(" "),
        placeholder,
        maxLength,
        ref: inputRef,
        type: type === "number" ? "text" : type,
        readOnly: readonly,
        onChange: handleOnInput,
        onKeyDown: formatInput,
        onFocus: handleOnFocus,
        onBlur,
        value: inputValue,
        autoComplete
    };
    const labelId = uuid();
    return (
        <div className="wrapper" style={style}>
            <div className="container">
                {icon ? (
                    <div className="icon">
                        <Button
                            title={buttonTitle || "Change"}
                            type="dimmed"
                            size="small"
                            onClick={onClickButton}
                            responsive
                            icon={icon}
                        />
                    </div>
                ) : null}
                {label ? (
                    <label htmlFor={labelId} className="input-label">
                        {label}
                        <input id={labelId} {...inputProps} onFocus={onFocus} onBlur={onBlur} />
                    </label>
                ) : (
                    <input {...inputProps} />
                )}
                {error && typeof error === "string" && <div className="error_line">{error}</div>}
            </div>
            <style jsx>
                {`
                    .wrapper {
                        width: ${width}px;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        flex: 1;
                    }
                    .error_line {
                        position: absolute;
                        top: 50px;
                        color: white;
                        background-color: var(--negative);
                        padding: 3px 10px 3px;
                        text-align: center;
                        font-size: var(--small2);
                        width: 100%;
                    }
                    .input {
                        border: 2px solid var(--lightBg);
                        margin-top: 5px;
                        background-color: var(--darkBg);
                        color: var(--accent);
                        border-radius: 2px;
                        font-size: var(--normal1);
                        padding: 11px;
                        padding-right: ${icon ? "35px" : "11px"};
                    }
                    .input.right {
                        text-align: right;
                    }
                    .input.error {
                        border: 2px solid var(--negative);
                    }
                    .input-label {
                        display: inline-grid;
                        color: white;
                    }
                    .icon {
                        position: absolute;
                        right: 5px;
                        top: 6px;
                    }
                    .input::-webkit-input-placeholder,
                    .input::placeholder {
                        color: var(--accent);
                    }
                    .input::-webkit-inner-spin-button {
                        display: none;
                    }
                    .input:focus {
                        outline: var(--primary) auto 0.5px;
                    }
                    .disabled {
                        pointer-events: none;
                        opacity: 0.5;
                    }

                    @media (max-width: 480px) {
                        .wrapper {
                            width: ${responsive ? width - (width / 100) * 14 : width}px;
                        }
                    }
                `}
            </style>
        </div>
    );
};
