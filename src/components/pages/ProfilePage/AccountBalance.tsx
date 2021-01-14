import React, { memo } from "react";

import { BetaIcon } from "assets/icons/svg";
import { color } from "config/constants";
import styles from "./AccountBalance.module.css";

const _AccountBalance: React.FC = () => (
    <>
        <div className={styles.regionTitle}>Cryptuoso Account</div>
        <div className={styles.surface}>
            <div className={styles.title}>
                Status:&nbsp;
                <div className={styles.beta}>Beta Trial</div>
            </div>
            <div className={styles.icon}>
                <BetaIcon color={color.lightBg} size={156} />
            </div>
            <div className={styles.comment}>All Cryptuoso Robot’s features are free for a limited time</div>
        </div>
    </>
);

export const AccountBalance = memo(_AccountBalance);
