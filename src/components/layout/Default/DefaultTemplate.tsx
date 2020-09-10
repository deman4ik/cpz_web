import React, { useContext } from "react";
import { useRouter } from "next/router";

import { PageHead } from "..";
import { NavHeader } from "./NavHeader";
import { NavBar } from "./NavBar";

import { PageType } from "config/types";
import { SCREEN_TYPE } from "config/constants";
import { useShowDimension } from "hooks/useShowDimension";
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

    return (
        <div
            className={styles.container}
            style={{
                maxWidth: "1400px"
            }}>
            <PageHead
                title={`${title}${subTitle ? `: ${subTitle}` : ""}`}
                description="Cryptuoso - Cryptocurrency Trading Robots for your successful investment"
                keywords="cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken, binance"
            />
            <div id="modal" />
            <div className={styles.mainMenuContainer}>
                <NavBar activeTab={page} showDesktop={showDimension} />
                <div className={styles.wrapFixed}>
                    <NavHeader
                        title={title}
                        subTitle={subTitle}
                        handlePressBack={handlePressBack}
                        hideToolbar={hideToolbar}
                        toolbar={toolbar}
                        style={{
                            maxWidth: "1200px"
                        }}
                    />
                </div>
                <div
                    className={styles.mainContainer}
                    style={{
                        maxWidth: "1400px"
                    }}>
                    {children}
                </div>
            </div>
        </div>
    );
};
