import React from "react";
import { EffectButton } from "components/basic/EffectButton";

import { MainMenuItemProps } from "../types";
import { PageType } from "config/types";

export const menuItems: MainMenuItemProps[] = [
    { label: PageType.dashboard, icon: "dashboard", route: "manage" },
    { label: PageType.users, icon: "users", route: "manage/users" },
    { label: PageType.manageRobots, icon: "manageRobots", route: "manage/robots" },
    { label: PageType.manageBacktests, icon: "backBurger", route: "manage/backtests" },
    { label: PageType.userSignals, icon: "userSignals", route: "manage/user_signals" },
    { label: PageType.userRobots, icon: "userRobots", route: "manage/user_robots" },
    { label: PageType.errors, icon: "error", route: "manage/errors" },
    { label: PageType.deadLetters, icon: "deadLetter", route: "manage/dead_letters" },
    { label: PageType.managementSupport, icon: "managementSupport", route: "manage/support" }
];

export const MenuButton = ({ onClick }: { onClick: () => void }): JSX.Element => (
    <div
        style={{
            height: "100%",
            width: 56,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <EffectButton onClick={onClick} icon="menu" />
    </div>
);
