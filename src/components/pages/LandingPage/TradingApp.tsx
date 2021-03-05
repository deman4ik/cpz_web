import React, { useRef, memo } from "react";
import Image from "next/image";
import { PrimaryButton } from "components/basic";
import { CircleIcon } from "assets/icons/svg";
import { tradingSteps, useAnchor } from "./helpers";
import { TradingStepType } from "./types";
import styles from "./TradingApp.module.css";

const _TradingApp: React.FC = () => {
    const refAnchor = useRef(null);
    const anchor = "trading-app";
    useAnchor(refAnchor, anchor);

    return (
        <div className={styles.app}>
            <div className={styles.row}>
                <div className={styles.robotsSteps}>
                    <a ref={refAnchor} id={anchor} className="visually-hidden">
                        Cryptuoso Trading App
                    </a>
                    <h2 className={styles.robotsStepsTitle}>Cryptuoso Trading App</h2>
                    {tradingSteps.map((item: TradingStepType, idx: number) => (
                        <div key={idx} className={styles.robotsStep}>
                            <div className={styles.robotsStepCircle}>
                                <CircleIcon color="white" />
                            </div>
                            <div className={styles.robotsStepText}>
                                <span className={styles.robotsTextAccent}>{item.accent}</span>
                                {item.text}
                            </div>
                        </div>
                    ))}
                    <div style={{ margin: "0 auto" }}>
                        <PrimaryButton title="Start now" href="/auth/login" type="secondary" />
                    </div>
                </div>
            </div>
            <div className={styles.tradingAppImgContainer}>
                <div className={styles.tradingAppImg}>
                    <Image src="/img/trading-app.png" alt="" width={1342} height={823} />
                </div>
            </div>
        </div>
    );
};

export const TradingApp = memo(_TradingApp);
