import React, { memo } from "react";
import { useRouter } from "next/router";

import { NavItem } from "./NavItem";

import logoAccent from "assets/img/logo-accent.png";

import { MainMenuItemProps } from "../types";
import { PageType } from "config/types";
import { TELEGRAM_COMMUNITY_URL } from "config/constants";
import styles from "./styles/NavBar.module.css";

interface Props {
    activeTab: PageType;
}

const _NavBar: React.FC<Props> = ({ activeTab }) => {
    const router = useRouter();
    const handleOnClick = (path: string, external: boolean) => {
        if (external) {
            window.location.assign(path);
        } else {
            router.push(`/${path}`).then(() => window.scrollTo(0, 0));
        }
    };

    const mainItems: MainMenuItemProps[] = [
        { label: PageType.robots, icon: "robot", route: "robots" },
        { label: PageType.signals, icon: "signals", route: "signals" },
        {
            label: PageType.notifications,
            icon: "notifications",
            route: "notifications"
        },
        { label: PageType.profile, icon: "profile", route: "profile" },
        { label: PageType.support, icon: "help", route: "support" }
    ];

    const secondaryItems: MainMenuItemProps[] = [
        {
            label: PageType.community,
            icon: "telegram",
            href: TELEGRAM_COMMUNITY_URL
        }
    ];

    return (
        <div className={styles.navBar}>
            <img className={`${styles.logo} ${styles.bigLogo}`} src={logoAccent} alt="" />
            <div className={styles.container}>
                {mainItems.map((item) => (
                    <NavItem
                        key={item.label}
                        item={item}
                        active={activeTab === item.label}
                        handleOnClick={handleOnClick}
                    />
                ))}
            </div>
            <div className={styles.secondaryItems}>
                <div className={styles.groupLine} />
                <div className={styles.container}>
                    {secondaryItems.map((item) => (
                        <NavItem key={item.label} item={item} active={false} handleOnClick={handleOnClick} />
                    ))}
                </div>
                <div className={styles.groupLine} />
            </div>
        </div>
    );
};

export const NavBar = memo(_NavBar);
