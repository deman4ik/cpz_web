import React, { memo } from "react";

import { DescriptionView } from "./DescriptionView";
import styles from "./index.module.css";

const _Description: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.title}>
            Still trading manually and constantly watching news,
            <br />
            trying to catch the trend? Following the exchange rates
            <br />
            <span className={styles.textWhite}>&nbsp;day&nbsp;</span>and
            <span className={styles.textAccent}>&nbsp;night</span>?
        </div>
        <div className={styles.line}>
            <div className={styles.text}>
                Cryptuoso provides&nbsp;
                <span className={styles.textWhite}>automated cryptocurrency trading robots</span> built on carefully
                tested trading algorithms.
            </div>
        </div>
        <div className={styles.line}>
            <div className={styles.text}>
                <span className={styles.textWhite}>Trading robots</span> make money on both{" "}
                <span className={styles.textGreen}>rising</span> and <span className={styles.redText}>falling</span> of
                cryptocurrency prices. The more volatile the market – the more opportunities for the robots.
            </div>
        </div>
        <div className={styles.line}>
            <div className={styles.text}>
                <span className={styles.textWhite}>Robots instantly respond</span> to cryptocurrency market fluctuations{" "}
                <span className={styles.textWhite}>and generate trading signals</span> that are safely transmitted to
                chosen сryptocurrency exchange on your behalf.
            </div>
        </div>
        <DescriptionView />
    </div>
);

export const Description = memo(_Description);
