import React, { FC } from "react";
import styles from "components/ui/RobotsItems/RobotsItem.module.css";
import { colorAction, formatMoney, valueWithSign } from "config/utils";

interface ProfitItemProps {
    profit: number;
}
export const ProfitItem: FC<ProfitItemProps> = ({ profit }) => {
    return (
        <div className={styles.profitCell} style={colorAction(profit > 0)}>
            &nbsp;{profit && `${valueWithSign(formatMoney(profit))} $`}
        </div>
    );
};
