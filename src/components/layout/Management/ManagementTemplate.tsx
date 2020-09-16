import React, { useState, useContext } from "react";

//components
import { PageHead } from "..";
import { Menu } from "./Menu";
import { NavBar } from "./NavBar";
import { NavHeader } from "./NavHeader";

//utils
import { PageType } from "config/types";
import { SCREEN_TYPE } from "config/constants";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

//context
import { LayoutContext } from "libs/hoc/context";

//styles
import styles from "./styles/Template.module.css";

interface Props {
    title?: string;
    subTitle?: string;
    page?: PageType;
    toolbar?: any;
    withToolbar?: boolean;
}

export const ManagementTemplate: React.FC<Props> = ({
    title,
    subTitle,
    children,
    page,
    toolbar,
    withToolbar = true
}) => {
    const { width } = useWindowDimensions();

    const { showDimension: menuHidden } = useShowDimension(width, SCREEN_TYPE.DESKTOP);
    const { showDimension: navBarOpen } = useShowDimension(width, SCREEN_TYPE.TABLET);

    const {
        layoutState: { menuOpen },
        setLayoutState
    } = useContext(LayoutContext);

    const isMenuOpen = menuOpen || false;
    const isNavOpen = menuOpen && navBarOpen;

    const setMenuOpen = (newVal) => {
        setLayoutState({ menuOpen: newVal });
    };

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const toggleNavBar = () => setMenuOpen(!isNavOpen);

    return (
        <div className={styles.container}>
            <PageHead title={`${title}${subTitle ? `: ${subTitle}` : ""}`} />
            <div id="modal" />
            {menuHidden ? (
                <NavBar activeTab={page} fullSize={isNavOpen} />
            ) : (
                <div id="menu">
                    <Menu activeTab={page} toggleMenu={toggleMenu} isOpen={isMenuOpen} />
                </div>
            )}

            <NavHeader
                title={title}
                subTitle={subTitle}
                toggleMenu={menuHidden ? toggleNavBar : toggleMenu}
                withToolbar={withToolbar}
                toolbar={toolbar}
                fullLength={!menuHidden}
                withNavOpen={isNavOpen}
            />
            <div
                className={`${styles.mainContainer} ${
                    menuHidden && isNavOpen ? styles.withFullNav : menuHidden ? styles.withNav : ""
                }`}>
                {children}
            </div>
        </div>
    );
};
