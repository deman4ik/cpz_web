import React, { useContext } from "react";
import { PageHead, NavBar } from "..";
import { MainMenu } from "./MainMenu";
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
    hideToolbar?: boolean;
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

export const DefaultTemplate: React.FC<Props> = ({
    title,
    subTitle,
    children,
    page,
    width,
    handlePressBack,
    toolbar,
    hideToolbar
}) => {
    const router = useRouter();
    const {
        authState: { isManager }
    } = useContext(AuthContext);
    const { showDimension } = useShowDimension(width, SCREEN_TYPE.PHONE);

    const containerStyles = isManager && router.pathname.includes("/manage") ? container_manage : container_default;
    const navbarStyles = isManager && router.pathname.includes("/manage") ? container_manage : navbar_default;

    return (
        <div className={styles.container} style={containerStyles}>
            <PageHead
                title={`${title}${subTitle ? `: ${subTitle}` : ""}`}
                description="Cryptuoso - Cryptocurrency Trading Robots for your successful investment"
                keywords="cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken, binance"
            />
            <div id="modal" />
            <div className={styles.mainMenuContainer} style={container_manage}>
                <MainMenu activeTab={page} showDesktop={showDimension} />
                {
                    // Hide layout header if it's empty
                }
                {title || subTitle || handlePressBack || toolbar ? (
                    <div className={styles.wrapFixed}>
                        <NavBar
                            title={title}
                            subTitle={subTitle}
                            handlePressBack={handlePressBack}
                            hideToolbar={hideToolbar}
                            toolbar={toolbar}
                            style={navbarStyles}
                        />
                    </div>
                ) : null}
                <div className={styles.mainContainer} style={containerStyles}>
                    {children}
                </div>
            </div>
        </div>
    );
};
