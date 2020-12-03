import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "assets/icons/svg";
import { PositionDirection, RobotsType } from "config/types";
import { capitalize } from "lodash";
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

export const renderDirection = (direction: PositionDirection): JSX.Element => {
    const Icon = direction === PositionDirection.short ? ArrowDownIcon : ArrowUpIcon;
    const iconColor = getColor(direction === PositionDirection.short);

    return (
        <span style={{ display: "flex", alignItems: "center", padding: "0 2px" }}>
            <span style={{ width: 50 }}>{capitalize(direction)}</span>
            <Icon color={iconColor} />
        </span>
    );
};
