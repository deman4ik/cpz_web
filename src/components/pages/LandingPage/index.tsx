import React from "react";
import { PageHead } from "components/layout/PageHead";

import styles from "./index.module.css";
import { Caption } from "./Caption";
import { Description } from "./Description";
import { SignalsList } from "./SignalsList";
import { TradingApp } from "./TradingApp";
import { TelegramBot } from "./TelegramBot";
import { RoadMap } from "./RoadMap";
import { Support } from "./Support";
import { Footer } from "components/layout";

const _LandingPage = () => (
    <>
        <PageHead
            title="Cryptocurrency Trading Platform"
            description="Cryptuoso - Cryptocurrency Trading Platform for your successful investment"
            keywords="cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken"
        />
        <div className={styles.landing}>
            <Caption />
            <div className={styles.bodyLanding}>
                <div className={styles.starsBackground} />
                <div className={styles.container}>
                    <Description />
                    <h2 className={styles.topRobotsTitle}>Top Performance Robots</h2>
                    <SignalsList />
                    <TradingApp />
                    <TelegramBot />
                    <h2 className={styles.roadmapTitle}>Cryptuoso roadmap</h2>
                    <RoadMap />
                    <Support />
                    <Footer />
                </div>
            </div>
        </div>
    </>
);

export const LandingPage = _LandingPage;
