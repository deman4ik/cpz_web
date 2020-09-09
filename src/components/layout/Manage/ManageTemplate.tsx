import React, { useContext } from "react";
import { PageHead, NavBar } from "..";
import { useRouter } from "next/router";

import { PageType } from "../../../config/types";
import { SCREEN_TYPE } from "../../../config/constants";
import { useShowDimension } from "../../../hooks/useShowDimension";
import styles from "./styles/Template.module.css";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    title?: string;
    subTitle?: string;
    page?: PageType;
    width: number;
    toolbar?: any;
    hideHeader?: boolean;
    handlePressBack?: () => void;
}

// styles
const container_manage = {
    maxWidth: "100%"
};
const container_default = {
    maxWidth: "1400px"
};
const navbar_default = {
    maxWidth: "1200px"
};

export const ManageTemplate: React.FC<Props> = ({
    title,
    subTitle,
    children,
    page,
    width,
    handlePressBack,
    toolbar
}) => {
    const router = useRouter();
    const {
        authState: { isManager }
    } = useContext(AuthContext);

    const containerStyles = isManager && router.pathname.includes("/manage") ? container_manage : container_default;
    const navbarStyles = isManager && router.pathname.includes("/manage") ? container_manage : navbar_default;

    return (
        <div className={styles.container} style={containerStyles}>
            <PageHead title={`${title}${subTitle ? `: ${subTitle}` : ""}`} />
            <div id="modal" />
            <div className={styles.mainMenuContainer} style={container_manage}>
                <MainMenu activeTab={page} />
                <div className={styles.wrapFixed}>
                    <NavBar
                        title={title}
                        subTitle={subTitle}
                        handlePressBack={handlePressBack}
                        hideToolbar={false}
                        toolbar={toolbar}
                        style={navbarStyles}
                    />
                </div>
                <div className={styles.mainContainer} style={containerStyles}>
                    {children}
                </div>
            </div>
        </div>
    );
};
