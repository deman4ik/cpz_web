import { Button } from "components/basic";
import StatsContainer from "components/pages/ManagePage/dashBoard/components/UserStats/StatsContainer";
import { PositionDirection, RobotsType } from "config/types";
import { formatMoney, getColorForMoney, valueWithSign } from "config/utils";
import { capitalize } from "lodash";
import Router from "next/router";
import React from "react";
import { DataCard } from "../DataCard";
import { renderDirectionValue } from "./helpers";
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
                    <StatsContainer
                        data={[
                            {
                                title: "Total",
                                value: netCount
                            },
                            ...Object.keys(openPositionsAggrData).map((direction) => ({
                                title: capitalize(direction),
                                value: renderDirectionValue(
                                    direction as PositionDirection,
                                    openPositionsAggrData[direction].count as number
                                )
                            }))
                        ]}
                        itemFontSize="var(--normal3)"
                    />
                    <div style={{ height: 35 }} />
                    <StatsContainer
                        data={[
                            {
                                title: "Unrealized Profit",
                                value: (
                                    <span style={{ color: getColorForMoney(netProfit) }}>
                                        {valueWithSign(formatMoney(netProfit))} $
                                    </span>
                                )
                            }
                        ]}
                        itemFontSize="var(--normal3)"
                    />
                </div>
            }
        />
    );
};
