import { Button } from "components/basic";
import { PositionDirection, RobotsType } from "config/types";
import { formatMoney, getColorForMoney } from "config/utils";
import { capitalize } from "lodash";
import Router from "next/router";
import React from "react";
import { DataCard } from "../DataCard";
import { renderDirection } from "./helpers";
import styles from "./index.module.css";

interface Props {
    openPositionsAggrData: { [key in PositionDirection]: { count: number; profit: number } };
    type: RobotsType;
}

export const RobotAggrOpenPositionsCard: React.FC<Props> = ({ openPositionsAggrData, type }) => {
    const handleDetailsPress = () => Router.push(`${type}/open-positions`);

    const { short, long } = openPositionsAggrData;

    const netCount = short.count + long.count;
    const netProfit = short.profit + long.profit;

    return (
        <DataCard
            header={
                <div>
                    <div className={styles.header} onClick={handleDetailsPress}>
                        My {capitalize(type as string)} Open Positions
                        <Button
                            title="details"
                            isUppercase
                            responsive
                            size="small"
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                            icon="chevronright"
                        />
                    </div>
                </div>
            }
            body={
                <div className={styles.body}>
                    {Object.keys(openPositionsAggrData).map((direction) => (
                        <div key={direction} className={styles.positionSection}>
                            {renderDirection(direction as PositionDirection)}
                            {openPositionsAggrData[direction].count}
                        </div>
                    ))}
                </div>
            }
            footer={
                <div>
                    <span className={styles.fieldName}>Total Positions:</span>&nbsp;{netCount}
                    <br />
                    <span className={styles.fieldName}>Unrealized Profit:</span>&nbsp;
                    <span style={{ color: getColorForMoney(netProfit) }}>{formatMoney(netProfit)} $</span>
                </div>
            }
        />
    );
};
