import React from "react";
import Router from "next/router";
// components
import { Button } from "components/basic";
// types
import { ButtonSize } from "components/basic/Button/types";

interface ButtonProps {
    style?: React.CSSProperties;
    size?: ButtonSize;
}

/*Кнопка  редиректа на логин*/
export const RedirectLoginButton: React.FC<ButtonProps> = ({ style, size }) => {
    const handleClick = () => {
        Router.push("/auth/login");
    };
    return (
        <Button
            style={style}
            type="success"
            size={size || "big"}
            title="log in"
            onClick={handleClick}
            width={260}
            isUppercase
        />
    );
};
