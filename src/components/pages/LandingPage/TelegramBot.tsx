import React, { useRef, memo } from "react";
import Image from "next/image";
import { PrimaryButton } from "components/basic";
import { CircleIcon } from "assets/icons/svg";
import { useAnchor } from "./helpers";
import styles from "./TradingApp.module.css";

const _TelegramBot: React.FC = () => {
    const refAnchor = useRef(null);
    const anchor = "trading-bot";
    useAnchor(refAnchor, anchor);

    return (
        <div className={styles.free}>
            <div className={styles.row}>
                <div className={styles.telegramBotImg}>
                    <Image quality={90} src="/img/phone-img.png" alt="" width={357} height={658} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.robotsSteps}>
                    <a ref={refAnchor} id={anchor} className="visually-hidden">
                        Cryptuoso Trading Telegram Bot
                    </a>
                    <h2 className={styles.robotsStepsTitle}>
                        Cryptuoso Trading{"\n"}
                        Telegram Bot
                    </h2>
                    <div className={styles.robotsStep}>
                        <div className={styles.robotsStepCircle}>
                            <CircleIcon color="white" />
                        </div>
                        <div className={styles.robotsStepText}>
                            <span className={styles.robotsTextAccent}>Manage</span> your Cryptuoso robots and
                            subscriptions <span className={styles.robotsTextAccent}>directly from Telegram</span>.
                        </div>
                    </div>
                    <div className={styles.robotsStep}>
                        <div className={styles.robotsStepCircle}>
                            <CircleIcon color="white" />
                        </div>
                        <div className={styles.robotsStepText}>
                            The most convenient way to{" "}
                            <span className={styles.robotsTextAccent}>quickly receive trading signals and alerts</span>{" "}
                            from robots in real time.
                        </div>
                    </div>
                    <div style={{ margin: "0 auto" }}>
                        <PrimaryButton
                            title="Try it now"
                            gtag_conversation
                            href={`https://t.me/${process.env.TELEGRAM_BOT_NAME}`}
                            type="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TelegramBot = memo(_TelegramBot);
