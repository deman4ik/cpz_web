import React, { memo } from "react";

import { colorAction, formatMoney } from "config/utils";
import styles from "./OpenPositionsSubtitle.module.css";

interface Props {
    volume: number;
    profit: number;
    asset: string;
}

const _OpenPositionsSubtitle: React.FC<Props> = ({ volume, profit, asset }) => (
    <div className={styles.title}>
        <div className={styles.asset} style={colorAction(volume > 0)}>
            {`${volume > 0 ? "+" : ""}${volume} ${asset}`}
        </div>
        <div className={styles.divider} />
        <div className={styles.currency} style={colorAction(profit > 0)}>
            {`${profit > 0 ? "+" : ""}${formatMoney(profit)} $`}
        </div>
    </div>
);

export const OpenPositionsSubtitle = memo(_OpenPositionsSubtitle);
