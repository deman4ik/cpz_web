import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "../Button";

interface Props {
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
    width?: number;
    responsive?: boolean;
    error?: string | boolean;
    selectTextOnFocus?: boolean;
    readonly?: boolean;
    style?: CSSProperties;
    right?: boolean;
    autoComplete?: string;
}

export const Input: React.FC<Props> = ({
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
    selectTextOnFocus,
    responsive,
    readonly,
    maxLength = 30,
    autoComplete = "hidden"
}) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);
    const handleOnInput = (e) => {
        if (type === "number") {
            e.target.value = e.target.value.toString().slice(0, 8);
        }
        if (onChangeText) {
            onChangeText(e.target.value);
        }
        setInputValue(e.target.value);
    };

    const formatInput = (e) => {
        if (type === "number") {
            if (e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 190 || e.keyCode === 13) {
                if (e.keyCode === 13) {
                    if (onKeyPress) onKeyPress(e);
                }
            } else if (e.keyCode < 48 || e.keyCode > 57) {
                e.preventDefault();
            }
        } else if (onKeyPress) onKeyPress(e);
    };

    const getInputClass = () => {
        const styleInput = ["input"];
        if (error) styleInput.push("error");
        if (right) styleInput.push("right");
        return styleInput;
    };

    const handleOnFocus = () => {
        if (selectTextOnFocus) {
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
                        <input id={labelId} {...inputProps} />
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
                        color: white;
                        background-color: var(--negative);
                        padding: 3px 10px 3px;
                        text-align: center;
                        font-size: var(--small2);
                        width: 100%;
                    }
                    .input {
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
