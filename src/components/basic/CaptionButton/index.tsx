import React from "react";

import {
    PlusIcon,
    CheckIcon,
    LogoutIcon,
    FilterVariantIcon,
    FilterVariantRemoveIcon,
    SettingsIcon,
    CloseIcon,
    BorderColorIcon as EditIcon,
    PlusBox,
    BullHorn,
    ChevronRightIcon,
    HelpIcon
} from "assets/icons/svg";

interface Props {
    title: string;
    style?: React.CSSProperties;
    icon?: string;
    width?: number;
    onClick?: () => void;
    responsive?: boolean;
    hidden?: boolean;
    href?: string;
}

const components = {
    check: CheckIcon,
    plus: PlusIcon,
    logout: LogoutIcon,
    filtervariant: FilterVariantIcon,
    filtervariantremove: FilterVariantRemoveIcon,
    settings: SettingsIcon,
    close: CloseIcon,
    edit: EditIcon,
    plusbox: PlusBox,
    announcement: BullHorn,
    chevronright: ChevronRightIcon,
    docs: HelpIcon
};

export const CaptionButton: React.FC<Props> = ({
    title,
    style,
    icon,
    width,
    onClick,
    responsive = true,
    hidden = false,
    href = null
}) => {
    const SpecificIcon = components[icon];
    const getClassName = () => {
        const composeClass = ["btn"];
        return composeClass;
    };

    return (
        <a href={href} target="_blank" rel="noreferrer">
            <div
                className={getClassName().join(" ")}
                style={{ ...style, display: hidden ? "none" : "flex" }}
                onClick={() => {
                    if (onClick) onClick();
                }}>
                {title && <div className="btn-text">{title}</div>}
                {SpecificIcon && (
                    <i className="icon" style={{ width: 24, height: 24, fill: "white" }}>
                        <SpecificIcon size={20} />
                    </i>
                )}
                <style jsx>
                    {`
                    .btn-text {
                        width: 100%;
                        color: white;
                        font-size: 14px;
                        text-align: center;
                        padding-left: 10px;
                        padding-right: 5px;
                        white-space: nowrap;
                        opacity: 1;
                        user-select: none;
                    }
                    .icon {
                    }
                    .btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        width: ${width ? `${width}px` : "min-content"};
                        height: 34px;
                        padding-left: 5px;
                        padding-right: 5px;
                        user-select: none;
                        overflow: hidden;
                        border-radius: 4px;
                        position: relative;
                        opacity: 1;
                        background-color: transparent;
                        text-transform: uppercase;
                    }
                    .btn:active {
                        opacity: 0.2;
                    }
                    @media (max-width: 768px) {
                        .btn-text {
                            width: 100%;
                            color: white;
                            font-size: 14px;
                            text-align: center;
                            padding-left: 10px;
                            padding-right: 5px;
                            white-space: nowrap;
                            opacity: 1;
                            user-select: none;
                        }
                        .icon {
                        }
                        .btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            width: ${width ? `${width}px` : "min-content"};
                            height: 34px;
                            padding-left: 5px;
                            padding-right: 5px;
                            user-select: none;
                            overflow: hidden;
                            border-radius: 4px;
                            position: relative;
                            opacity: 1;
                            background-color: transparent;
                            text-transform: uppercase;
                        }
                        .btn:active {
                            opacity: 0.2;
                        }
                        @media (max-width: 768px) {
                            .btn-text {
                                display: ${responsive ? "none" : "block"};
                            }
                            .btn {
                                padding: 0 15px;
                            }
                        }
                        @media (max-width: 390px) {
                            .btn {
                                padding-left: 10px;
                                padding-right: 5px;
                            }
                        }
                    `}
                </style>
            </div>
        </a>
    );
};
