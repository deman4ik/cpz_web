import React, { useState } from "react";
import { PageHead } from "..";
import { Menu } from "./Menu";
import { NavBar } from "./NavBar";
import { NavHeader } from "./NavHeader";

import { PageType } from "config/types";
import { SCREEN_TYPE } from "config/constants";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
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

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isNavOpen, setNavOpen] = useState(navBarOpen);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const toggleNavBar = () => setNavOpen(!isNavOpen);

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
