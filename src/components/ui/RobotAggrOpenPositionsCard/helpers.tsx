import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "assets/icons/svg";
import { PositionDirection, RobotsType } from "config/types";
import { getColor } from "config/utils";

const aggrPositionsTableName = {
    signals: "v_user_signal_positions_aggregate",
    robots: "v_user_positions_aggregate"
};

export const parseAggregatedPositionsData = (
    data: { [key: string]: { aggregate: { count: number }; nodes: [{ profit: number }] } },
    type: RobotsType
): { count: number; profit: number } => {
    if (!data) return { count: null, profit: null };

    const {
        aggregate: { count },
        nodes
    } = data[aggrPositionsTableName[type]];

    return {
        count,
        profit: nodes.reduce((acc, val) => acc + val.profit, 0)
    };
};

export const renderDirectionValue = (direction: PositionDirection, value: number | string): JSX.Element => {
    const Icon = direction === PositionDirection.short ? ArrowDownIcon : ArrowUpIcon;
    const iconColor = getColor(direction === PositionDirection.short);

    return (
        <span style={{ display: "flex", alignItems: "center", padding: "0 2px" }}>
            <Icon color={iconColor} />
            <span style={{ width: 20 }}>{value}</span>
        </span>
    );
};
