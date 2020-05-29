import React from "react";
import { ButtonProps } from "./types";
import { props } from "./helpers";
import { LoadingIndicator } from "components/common";
// components parts
import ButtonInnerComponent from "./ButtonInner";

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
    const rounded = type?.includes("roundend");
    const iconSize = 15;

    const withHover = hoverChanges ? "with-hover" : "";

    /*Параметры Hover*/
    const hoverChangesParams = {
        type: hoverChanges?.type || type,
        title: hoverChanges?.title || title,
        icon: hoverChanges?.icon || icon
    };

    /*Обработка классов*/
    const getClassName = () => {
        const composeClass = ["btn"];
        if (className) composeClass.push(className);
        if (isUppercase) composeClass.push("uppercase");
        if (isLoading) composeClass.push("loading");
        return composeClass;
    };

    /*classNames для кнопок*/
    const classNamesMain = [...getClassName(), "main-button"];
    const classNamesHover = withHover && [...getClassName(), "hovered-button"];
    if (type) classNamesMain.push(type);
    if (withHover) classNamesHover.push(hoverChangesParams.type);

    /*Обработчик клика*/
    const handleOnClick = () => {
        if (!isLoading && !disabled && onClick) {
            onClick();
        }
    };

    return (
        <div className={withHover}>
            <div className={classNamesMain.join(" ")} style={style} onClick={handleOnClick}>
                {isLoading ? (
                    <LoadingIndicator color="white" size={props[size].indicator} style={{ margin: "auto" }} />
                ) : (
                    <ButtonInnerComponent
                        size={size}
                        type={type}
                        icon={icon}
                        title={title}
                        style={style}
                        responsive={responsive}
                        iconSize={iconSize}
                    />
                )}
            </div>
            {hoverChanges && (
                <div className={classNamesHover.join(" ")} onClick={handleOnClick}>
                    <ButtonInnerComponent
                        size={size}
                        style={style}
                        responsive={responsive}
                        iconSize={iconSize}
                        {...hoverChangesParams}
                    />
                </div>
            )}
            <style jsx>
                {`   
          .hovered-button {
            display: none !important;
          }
          
          .with-hover:hover .main-button {
              display: none !important;
          }
          
          .with-hover:hover .hovered-button {
            display: flex !important;
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
            background-image: linear-gradient(
              rgb(28, 164, 107),
              rgb(9, 107, 65)
            );
          }
          .btn.primary {
            background-image: linear-gradient(
              rgb(11, 152, 197),
              rgb(4, 97, 128)
            );
          }
          .btn.negative {
            background-image: linear-gradient(
              rgb(205, 62, 96),
              rgb(133, 20, 47)
            );
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
              width: 
              ${responsive ? "min-content" : width ? `${width}px` : "min-content"};
          }
        `}
            </style>
        </div>
    );
};
