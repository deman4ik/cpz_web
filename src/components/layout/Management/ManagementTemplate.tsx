import React, { useState } from "react";
import { PageHead } from "..";
import { Menu } from "./Menu";
import { NavBar } from "./NavBar";
import { NavHeader } from "./NavHeader";

import { PageType } from "config/types";
import { SCREEN_TYPE } from "config/constants";
import { useShowDimension } from "hooks/useShowDimension";
import styles from "./styles/Template.module.css";

interface Props {
    title?: string;
    subTitle?: string;
    page?: PageType;
    toolbar?: any;
    hideHeader?: boolean;
}

export const ManagementTemplate: React.FC<Props> = ({ title, subTitle, children, page, toolbar }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <div
            className={styles.container}
            style={{
                maxWidth: "100%"
            }}>
            <PageHead title={`${title}${subTitle ? `: ${subTitle}` : ""}`} />
            <div id="modal" />
            <div className={styles.mainMenuContainer}>
                <Menu activeTab={page} toggleMenu={toggleMenu} isOpen={isMenuOpen} />
                <NavBar activeTab={page} />
                <NavHeader
                    title={title}
                    subTitle={subTitle}
                    toggleMenu={toggleMenu}
                    hideToolbar={false}
                    toolbar={toolbar}
                />
                <div className={styles.mainContainer}>{children}</div>
            </div>
        </div>
    );
};
