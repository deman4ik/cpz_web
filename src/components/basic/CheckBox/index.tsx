/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { CSSProperties, forwardRef } from "react";

import { LoadingIndicator } from "../../common";
import { uniqueId } from "lodash";

interface Props {
    checked: boolean;
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    ref?: any;
    title?: string;
    indeterminate?: boolean;
}

export const CheckBox: React.FC<Props> = forwardRef(
    ({ style, checked = false, label, disabled, onClick, isLoading, indeterminate, ...rest }, ref) => {
        const handleClick = () => {
            if (!disabled) {
                if (onClick) onClick();
            }
        };

        const id = uniqueId();

        return (
            <>
                <div onClick={handleClick} style={style} className="container">
                    <>
                        {isLoading && (
                            <div className="loader">
                                <LoadingIndicator size={10} />
                            </div>
                        )}
                        <input
                            id={id}
                            className="checkbox"
                            type="checkbox"
                            defaultChecked={checked}
                            ref={ref}
                            disabled={disabled}
                            {...rest}
                        />
                        <label htmlFor={id}>{label}</label>
                    </>
                </div>
                <style jsx>
                    {`
                        .container {
                            color: #fff;
                            font-size: var(--normal1);
                            position: relative;
                            cursor: pointer;
                        }

                        .checkbox {
                            position: absolute;
                            opacity: 0;
                            cursor: pointer;
                            height: 0;
                            width: 0;
                            top: 0;
                            left: 0;
                            margin: 0;
                        }

                        .checkbox + label {
                            display: flex;
                            align-items: center;
                            position: relative;
                            cursor: pointer;
                            padding: 0;
                            color: white;
                            height: 20px;
                        }

                        .checkbox + label:before {
                            content: "";
                            display: inline-block;
                            vertical-align: text-top;
                            margin-right: ${label ? "16px" : 0};
                            height: 12px;
                            width: 12px;
                            border: 2px solid;
                            border-radius: 2px;
                            ${indeterminate || checked ? "border-color: var(--accent);" : ""};
                        }

                        .checkbox:disabled + label:before {
                            border-color: rgba(0, 0, 0, 0.26) !important;
                        }

                        .checkbox:disabled + label {
                            color: var(--whiteLight);
                            pointer-events: none;
                        }

                        .checkbox + label:after {
                            content: "";
                            display: ${indeterminate || checked ? "block" : "none"};
                            position: absolute;
                            left: 5px;
                            top: ${indeterminate ? "-3px" : "2px"};
                            width: ${indeterminate ? "6px" : "5px"};
                            height: 12px;
                            border: solid var(--primary);
                            border-width: 0 ${indeterminate ? "0" : "2px"} 2px 0;
                            -webkit-transform: ${indeterminate ? "none" : "rotate(45deg)"};
                            -ms-transform: ${indeterminate ? "none" : "rotate(45deg)"};
                            transform: ${indeterminate ? "none" : "rotate(45deg)"};
                        }

                        .loader {
                            display: flex;
                            justify-content: flex-start;
                            position: absolute;
                            top: 0;
                            left: 2px;
                            bottom: 0;
                            right: 0;
                        }

                        .loader + .checkbox + label:before,
                        .loader + .checkbox + label:after {
                            visibility: hidden;
                        }
                    `}
                </style>
            </>
        );
    }
);
