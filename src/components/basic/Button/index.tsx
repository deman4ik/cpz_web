import React, { useState, useEffect } from "react";

import { ButtonProps } from "./types";
import { components, props } from "./helpers";
import { LoadingIndicator } from "../../common";

export const Button: React.FC<ButtonProps> = ({
    title,
    type,
    style,
    icon,
    isUppercase,
    isLoading,
    onClick,
    width,
    className,
    disabled,
    responsive,
    size = "normal",
    hoverChanges,
    clickable = true
}) => {
    const [base, setBase] = useState({ title, icon, type });
    const SpecificIcon = components[base.icon];
    const rounded = type && type.indexOf("rounded") === 0;
    const iconSize = 15;
    const getClassName = () => {
        const composeClass = ["btn"];
        if (className) composeClass.push(className);
        if (isUppercase) composeClass.push("uppercase");
        if (isLoading) composeClass.push("loading");
        if (base.type) composeClass.push(base.type);
        return composeClass;
    };

    const handleOnClick = () => {
        if (!isLoading && !disabled && onClick) {
            onClick();
        }
    };

    const handleMouseEnter = () => {
        if (hoverChanges) {
            setBase({
                type: hoverChanges.type || type,
                title: hoverChanges.title || title,
                icon: hoverChanges.icon || icon
            });
        }
    };

    const handleMouseLeave = () => {
        setBase({ title, icon, type });
    };

    useEffect(() => {
        setBase((prev) => ({ ...prev, type, title, icon }));
    }, [type, title, icon]);

    return (
        <div
            className={getClassName().join(" ")}
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}>
            {isLoading ? (
                <LoadingIndicator color="white" size={props[size].indicator} />
            ) : (
                <>
                    <div className="btn-text">{base.title}</div>
                    {base.icon ? (
                        <i className="icon">
                            <SpecificIcon size={iconSize} />
                        </i>
                    ) : null}
                    <div className="aligner" />
                </>
            )}
            <style jsx>
                {`
                    .btn-text {
                        width: 100%;
                        color: ${base.type === "rounded-negative" ? "var(--negative)" : "white"};
                        font-size: ${size === "small" ? 12 : 14}px;
                        text-align: center;
                        white-space: nowrap;
                        padding-left: 4px;
                        padding-right: 4px;
                    }
                    .icon {
                        padding-right: 8px;
                        position: absolute;
                        width: ${iconSize}px;
                        height: ${iconSize}px;
                        right: 8px;
                    }
                    .aligner {
                        width: ${base.icon ? 20 : 0}px;
                    }
                    .loading {
                        justify-content: center;
                    }
                    .btn {
                        display: flex;
                        cursor: ${disabled ? "auto" : "pointer"};
                        width: ${width ? `${width}px` : "min-content"};
                        height: ${props[size].height}px;
                        padding-left: 10px;
                        padding-right: 10px;
                        user-select: none;
                        align-items: center;
                        overflow: hidden;
                        border-radius: ${rounded ? 15 : 4}px;
                        position: relative;
                        opacity: ${disabled ? 0.2 : 1};
                    }
                    .btn:active {
                        opacity: ${clickable ? 0.2 : 1};
                    }
                    .btn.uppercase {
                        text-transform: uppercase;
                    }
                    .btn.success {
                        background-image: linear-gradient(rgb(28, 164, 107), rgb(9, 107, 65));
                    }
                    .btn.primary {
                        background-image: linear-gradient(rgb(11, 152, 197), rgb(4, 97, 128));
                    }
                    .btn.negative {
                        background-image: linear-gradient(rgb(205, 62, 96), rgb(133, 20, 47));
                    }
                    .btn.rounded-primary {
                        background-color: rgb(4, 97, 128);
                    }
                    .btn.rounded,
                    .btn.rounded-negative {
                        background-color: rgba(0, 0, 0, 0);
                    }
                    .btn.dimmed {
                        background-color: rgb(44, 52, 84);
                    }
                    @media (max-width: 768px) {
                        .btn-text {
                            display: ${responsive ? "none" : "block"};
                        }
                        .btn {
                            width: ${responsive ? "min-content" : width ? `${width}px` : "min-content"};
                        }
                        .aligner {
                            width: ${base.icon ? (responsive ? "12px" : "20px") : 0};
                        }
                        .icon {
                            right: ${responsive && style ? 0 : "8px"};
                        }
                    }
                `}
            </style>
        </div>
    );
};
