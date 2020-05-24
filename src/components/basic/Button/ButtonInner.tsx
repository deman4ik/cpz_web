import React from "react";
import { ButtonInnerProps } from "./types";
import { components } from "./helpers";

/*Компонент внутренностей кнопки*/
const ButtonInnerComponent: React.FC<ButtonInnerProps> = ({ icon, title, iconSize, type, size, style, responsive }) => {
    const SpecificIcon = components[icon];
    return (
        <>
            <div className="btn-text">{title}</div>
            {icon && <SpecificIcon size={iconSize} />}
            <div className="aligner" />
            <style jsx>
                {`
                    .btn-text {
                        width: 100%;
                        color: ${type === "rounded-negative" ? "var(--negative)" : "white"};
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
                        width: ${icon ? 20 : 0}px;
                    }
                    @media (max-width: 768px) {
                        .aligner {
                            width: ${icon ? (responsive ? "12px" : "20px") : 0};
                        }
                        .icon {
                            right: ${responsive && style ? 0 : "8px"};
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ButtonInnerComponent;
