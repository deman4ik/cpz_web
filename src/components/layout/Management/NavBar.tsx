import React, { memo, useContext } from "react";
import { useRouter } from "next/router";

import { NavItem } from "./NavItem";

import { menuItems } from "./constants";
import { PageType } from "config/types";

import styles from "./styles/NavBar.module.css";

import logo from "assets/img/logo-accent.png";

interface Props {
    activeTab: PageType;
    fullSize?: boolean;
}

const _NavBar: React.FC<Props> = ({ activeTab, fullSize = false }) => {
    const router = useRouter();
    const handleOnClick = (path: string, external: boolean) => {
        if (external) {
            window.location.assign(path);
        } else {
            router.push(`/${path}`).then(() => window.scrollTo(0, 0));
        }
    };

    return (
        <div className={`${styles.navBar} ${fullSize ? styles.fullSize : ""}`}>
            <div className={styles.navBarContainer}>
                <div className={styles.logoWrapper}>
                    <img className={`${styles.logo}`} src={logo} alt="" />
                </div>
                {menuItems.map((item) => (
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
