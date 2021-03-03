import React, { useContext } from "react";
import { Caption } from "./Caption";
import { Description } from "./Description";
import { SignalsList } from "./SignalsList";
import { MadeToHelp } from "./MadeToHelp";
import { Pricing } from "./Pricing";
import { Feedback } from "./Feedback";
import { TradingApp } from "./TradingApp";
import { TelegramBot } from "./TelegramBot";
import { RoadMap } from "./RoadMap";
import { Support } from "./Support";
import { Faq } from "./Faq";
import { Founders } from "./Founders";
import { Aboutus } from "./Aboutus";
import { PageHead, Footer } from "components/layout";
import { AuthContext } from "providers/authContext";
import styles from "./index.module.css";

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        name?: string;
    }
}

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
                        <SignalsList />
                        <MadeToHelp />
                        <Pricing />
                        <Feedback />
                        <TradingApp />
                        <TelegramBot />
                        <Faq />
                        <Founders />
                        <Aboutus />
                        <RoadMap />
                        <Support />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export const LandingPage = _LandingPage;
