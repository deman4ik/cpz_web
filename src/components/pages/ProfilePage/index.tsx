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
import { DefaultTemplate } from "components/layout";
// context
import { AuthContext } from "providers/authContext";

export const ProfilePage = () => {
    /*Контекст аутентификации для отображения данных*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    return (
        <DefaultTemplate
            page={PageType.profile}
            title="Profile"
            subTitle="Settings"
            toolbar={isAuth && <ToolbarProfilePage />}>
            <UserContainer width={width} />
            <ExchangeKeys title="My Exchange API Keys" />
            {isAuth && <NotifySettings />}
        </DefaultTemplate>
    );
};
