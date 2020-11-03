import React, { memo } from "react";

import { colorAction, formatMoney } from "config/utils";
import styles from "./OpenPositionsTitle.module.css";

interface Props {
    volume: number;
    profit: number;
    asset: string;
}

const _OpenPositionsTitle: React.FC<Props> = ({ volume, profit, asset }) => (
    <div className={styles.title}>
        <div className={styles.titleText} style={colorAction(volume > 0)}>
            {`${volume > 0 ? "+" : ""}${volume} ${asset}`}
        </div>
        <div className={styles.divider} />
        <div className={styles.titleText} style={colorAction(profit > 0)}>
            {`${profit > 0 ? "+" : ""}${formatMoney(profit)} $`}
        </div>
    </div>
);

export const OpenPositionsTitle = memo(_OpenPositionsTitle);
