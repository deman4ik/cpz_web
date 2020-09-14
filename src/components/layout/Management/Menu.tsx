import React, { memo, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import logo from "assets/img/logo-accent.png";
import { NavItem } from "./NavItem";

import { MenuButton, menuItems } from "./constants";
import { PageType } from "config/types";

import styles from "./styles/Menu.module.css";

interface Props {
    activeTab: PageType;
    toggleMenu: any;
    isOpen: boolean;
}

const _Menu: React.FC<Props> = ({ activeTab, toggleMenu, isOpen }) => {
    const router = useRouter();
    const handleOnClick = (path: string, external: boolean) => {
        if (external) {
            window.location.assign(path);
        } else {
            router.push(`/${path}`).then(() => window.scrollTo(0, 0));
        }
    };

    const menu = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (isOpen && menu.current && !menu.current.contains(event.target)) toggleMenu();
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu, toggleMenu, isOpen]);

    return (
        <div ref={menu} className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
            <div className={styles.menuContainer}>
                <div className={styles.menuHeader}>
                    <MenuButton onClick={toggleMenu} />
                    <div className={styles.logoWrapper}>
                        <img className={`${styles.logo}`} src={logo} alt="" />
                    </div>
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

export const Menu = memo(_Menu);
