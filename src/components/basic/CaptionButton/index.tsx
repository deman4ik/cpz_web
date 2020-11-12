import React from "react";

import {
    PlusIcon,
    CheckIcon,
    LogoutIcon,
    FilterVariantIcon,
    FilterVariantRemoveIcon,
    SettingsIcon,
    CloseIcon,
    BorderColorIcon as EditIcon
} from "assets/icons/svg";

interface Props {
    title: string;
    style?: React.CSSProperties;
    icon?: string;
    width?: number;
    onClick?: () => void;
    responsive?: boolean;
    hidden?: boolean;
}

const components = {
    check: CheckIcon,
    plus: PlusIcon,
    logout: LogoutIcon,
    filtervariant: FilterVariantIcon,
    filtervariantremove: FilterVariantRemoveIcon,
    settings: SettingsIcon,
    close: CloseIcon,
    edit: EditIcon
};

export const CaptionButton: React.FC<Props> = ({
    title,
    style,
    icon,
    width,
    onClick,
    responsive = true,
    hidden = false
}) => {
    const SpecificIcon = components[icon];
    const getClassName = () => {
        const composeClass = ["btn"];
        return composeClass;
    };

    return (
        <div
            className={getClassName().join(" ")}
            style={{ ...style, display: hidden ? "none" : "flex" }}
            onClick={onClick}>
            <div className="btn-text">{title}</div>
            <i className="icon" style={{ width: 20, height: 20 }}>
                <SpecificIcon size={20} />
            </i>
            <style jsx>
                {`
                    .btn-text {
                        width: 100%;
                        color: white;
                        font-size: 14px;
                        text-align: center;
                        padding-left: 10px;
                        padding-right: 10px;
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
    );
};
