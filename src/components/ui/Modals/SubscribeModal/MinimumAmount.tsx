import React, { FC } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";

interface MinimumAmountProps {
    minAmount: number | string;
    asset: string;
    minAmountUSD: number;
}
export const MinimumAmount: FC<MinimumAmountProps> = ({ minAmount, asset, minAmountUSD }) => {
    return (
        <div className={[styles.bodyText, styles_subs.formComment].join(" ")}>
            <div className={styles.value_group}>
                <div className={styles_subs.label}>Minimal value is&nbsp;</div>
                <div className={styles.value_row}>
                    <span>{minAmount}</span>&nbsp;
                    <span style={{ color: "white" }}>{asset}</span>
                    &nbsp;≈&nbsp;{minAmountUSD}
                    &nbsp;$
                </div>
            </div>
        </div>
    );
};
