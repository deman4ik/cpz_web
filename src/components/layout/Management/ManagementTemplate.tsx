import React, { useState } from "react";
import { PageHead } from "..";
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
    width: number;
    toolbar?: any;
    hideHeader?: boolean;
}

export const ManagementTemplate: React.FC<Props> = ({ title, subTitle, children, page, width, toolbar }) => {
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
                <NavBar activeTab={page} isOpen={isMenuOpen} />
                <NavHeader
                    title={title}
                    subTitle={subTitle}
                    handleOpenMenu={toggleMenu}
                    hideToolbar={false}
                    toolbar={toolbar}
                />
                <div className={styles.mainContainer}>{children}</div>
            </div>
        </div>
    );
};
