import React, { useContext } from "react";
import { Caption } from "./Caption";
import { Description } from "./Description";
import { SignalsList } from "./SignalsList";
import { TradingApp } from "./TradingApp";
import { TelegramBot } from "./TelegramBot";
import { RoadMap } from "./RoadMap";
import { Support } from "./Support";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Founders } from "./Founders";
import { PageHead, Footer } from "components/layout";
import { AuthContext } from "providers/authContext";
import styles from "./index.module.css";

const _LandingPage: React.FC = () => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    return (
        <>
            <PageHead
                title="Cryptocurrency Trading Platform"
                description="Cryptuoso - Cryptocurrency Trading Platform for your successful investment"
                keywords="cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken"
                userId={user_id}
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
                        <Pricing />
                        <Faq />
                        <Founders />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export const LandingPage = _LandingPage;
