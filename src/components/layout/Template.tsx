import React from "react";
import { PageHead, MainMenu, NavBar } from ".";

import { PageType } from "../../config/types";
import { SCREEN_TYPE } from "../../config/constants";
import { useShowDimension } from "../../hooks/useShowDimension";
import styles from "./Template.module.css";

interface Props {
    title?: string;
    subTitle?: string;
    page?: PageType;
    width: number;
    toolbar?: any;
    hideToolbar?: boolean;
    handlePressBack?: () => void;
}

export const Template: React.FC<Props> = ({
    title,
    subTitle,
    children,
    page,
    width,
    handlePressBack,
    toolbar,
    hideToolbar
}) => {
    const { showDimension } = useShowDimension(width, SCREEN_TYPE.PHONE);

    return (
        <div className={styles.container}>
            <PageHead
                title={`${title}${subTitle ? `: ${subTitle}` : ""}`}
                description="Cryptuoso - Cryptocurrency Trading Robots for your successful investment"
                keywords="cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken, binance"
            />
            <div id="modal" />
            <div className={styles.mainMenuContainer}>
                <MainMenu activeTab={page} showDesktop={showDimension} />
                <div className={styles.wrapFixed}>
                    <NavBar
                        title={title}
                        subTitle={subTitle}
                        handlePressBack={handlePressBack}
                        hideToolbar={hideToolbar}
                        toolbar={toolbar}
                    />
                </div>
            </div>
            <div className={styles.mainContainer}>{children}</div>
        </div>
    );
};
