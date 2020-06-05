import React from "react";
import Router from "next/router";
// components
import { Button } from "components/basic";

interface ButtonProps {
    style?: React.CSSProperties;
}

/*Кнопка  редиректа на логин*/
export const RedirectLoginButton: React.FC<ButtonProps> = ({ style }) => {
    const handleClick = () => {
        Router.push("/auth/login");
    };
    return (
        <Button style={style} type="success" size="big" title="log in" onClick={handleClick} width={260} isUppercase />
    );
};
