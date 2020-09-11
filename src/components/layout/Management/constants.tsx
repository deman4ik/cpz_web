import React from "react";
import { EffectButton } from "components/basic/EffectButton";

import { MainMenuItemProps } from "../types";
import { PageType } from "config/types";

export const menuItems: MainMenuItemProps[] = [
    { label: PageType.dashboard, icon: "dashboard", route: "manage" },
    { label: PageType.users, icon: "users", route: "manage/users" },
    { label: PageType.manageRobots, icon: "manageRobots", route: "manage/robots" },
    { label: PageType.userSignals, icon: "userSignals", route: "manage/user_signals" },
    { label: PageType.userRobots, icon: "userRobots", route: "manage/user_robots" },
    { label: PageType.supportRequests, icon: "supportRequests", route: "manage/support" }
];

export const MenuButton = ({ onClick }) => (
    <div
        style={{
            width: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <EffectButton onClick={onClick} icon="menu" />
    </div>
);
