import React from "react";

export type ButtonSize = "big" | "normal" | "small";
export type ButtonType =
    | "primary"
    | "success"
    | "dimmed"
    | "negative"
    | "outline"
    | "outline-white"
    | "rounded"
    | "rounded-primary"
    | "rounded-negative";

interface HoverChangesProps {
    type?: ButtonType;
    title?: string;
    icon?: string;
}

export interface ButtonInnerProps {
    title?: string;
    icon?: string;
    type?: string;
    style?: React.CSSProperties;
    responsive?: boolean;
    iconSize?: number;
    size?: ButtonSize;
}

export interface ButtonProps extends ButtonInnerProps {
    isUppercase?: boolean;
    isLoading?: boolean;
    width?: number;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    hoverChanges?: HoverChangesProps;
    clickable?: boolean;
}
