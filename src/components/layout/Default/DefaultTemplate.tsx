import React from "react";

import { PageHead } from "..";
import { NavHeader } from "./NavHeader";
import { NavBar } from "./NavBar";

import { PageType } from "config/types";
import styles from "./styles/Template.module.css";
import Router from "next/router";
import { isNewPage } from "utils/common";

interface Props {
    title?: string;
    subTitle?: string;
    page?: PageType;
    toolbar?: any;
    handleBackNavigation?: boolean | (() => void);
}

export const DefaultTemplate: React.FC<Props> = ({
    title,
    subTitle,
    children,
    page,
    toolbar,
    handleBackNavigation = false
}) => {
    const handlePressBack =
        handleBackNavigation &&
        (typeof handleBackNavigation === "function" ? handleBackNavigation : !isNewPage() ? () => Router.back() : null);

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
                <NavBar activeTab={page} />
                <div className={styles.wrapFixed}>
                    <NavHeader
                        title={title}
                        subTitle={subTitle}
                        handlePressBack={handlePressBack}
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
