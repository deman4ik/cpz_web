import React, { memo, useContext } from "react";
import { useRouter } from "next/router";

import { NavItem } from "./NavItem";

import logoAccent from "assets/img/logo-accent.png";

import { MainMenuItemProps } from "../types";
import { PageType } from "config/types";

import defaultStyles from "./styles/Navigation.module.css";
import wideStyles from "./styles/WideNavigation.module.css";

interface Props {
    activeTab: PageType;
    isOpen: boolean;
}
const mainItems: MainMenuItemProps[] = [
    { label: PageType.dashboard, icon: "dashboard", route: "manage" },
    { label: PageType.users, icon: "users", route: "manage/users" },
    { label: PageType.manageRobots, icon: "manageRobots", route: "manage/robots" },
    { label: PageType.userSignals, icon: "userSignals", route: "manage/user_signals" },
    { label: PageType.userRobots, icon: "userRobots", route: "manage/user_robots" },
    { label: PageType.supportRequests, icon: "supportRequests", route: "manage/support" }
];

const _NavBar: React.FC<Props> = ({ activeTab, isOpen }) => {
    const router = useRouter();
    const handleOnClick = (path: string, external: boolean) => {
        if (external) {
            window.location.assign(path);
        } else {
            router.push(`/${path}`).then(() => window.scrollTo(0, 0));
        }
    };

    const styles = isOpen ? defaultStyles : wideStyles;

    return (
        <div className={styles.menu}>
            <div className={styles.menuContainer}>
                {mainItems.map((item) => (
                    <NavItem
                        key={item.label}
                        item={item}
                        active={activeTab === item.label}
                        handleOnClick={handleOnClick}
                        styles={styles}
                    />
                ))}
            </div>
        </div>
    );
};

export const NavBar = memo(_NavBar);
