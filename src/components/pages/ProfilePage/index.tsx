import React from "react";
import { Template } from "components/layout/Template";

import useWindowDimensions from "hooks/useWindowDimensions";
import { ExchangeKeys } from "./ExchangeKeys";
import { UserContainer } from "./UserContainer";
import { NotifySettings } from "./NotifySettings";
import { PageType } from "config/types";
import { ToolbarProfilePage } from "./ToolbarProfilePage";

export const ProfilePage = () => {
    const { width } = useWindowDimensions();
    return (
        <Template
            page={PageType.profile}
            title="Profile"
            subTitle="Settings"
            toolbar={<ToolbarProfilePage />}
            width={width}>
            <UserContainer width={width} />
            <ExchangeKeys title="My Exchange API Keys" />
            <NotifySettings />
        </Template>
    );
};
