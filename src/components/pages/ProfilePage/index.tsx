/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext } from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { ExchangeKeys } from "./ExchangeKeys";
import { UserContainer } from "./UserContainer";
import { NotifySettings } from "./NotifySettings";
import { PageType } from "config/types";
import { ToolbarProfilePage } from "./ToolbarProfilePage";
import { Template } from "components/layout/Template";
// context
import { AuthContext } from "libs/hoc/authContext";

export const ProfilePage = () => {
    /*Контекст аутентификации для отображения данных*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    return (
        <Template
            page={PageType.profile}
            title="Profile"
            subTitle="Settings"
            toolbar={isAuth && <ToolbarProfilePage />}
            width={width}>
            <UserContainer width={width} />
            <ExchangeKeys title="My Exchange API Keys" />
            {isAuth && <NotifySettings />}
        </Template>
    );
};
