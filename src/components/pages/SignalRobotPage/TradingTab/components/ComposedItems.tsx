/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

import { ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";

import { SectionType } from "../../types";
import { colorAction, getIconName, getColor, getIconNameAction } from "config/utils";

import styles from "./styles/RobotPositionCard.module.css";

const icons = {
    arrowup: ArrowUpIcon,
    arrowdown: ArrowDownIcon
};

export const renderVolume = (activeTab, item, asset) => {
    const Icon = icons[getIconName(item.direction)];
    return (
        <div className={`${styles.iconLine} ${styles.mobileCardTextValue}`}>
            {activeTab === SectionType.openPositions && (
                <div style={{ marginLeft: -6, marginRight: 0, marginTop: 1 }}>
                    <Icon color={getColor(item.direction === "short")} size={16} />
                </div>
            )}
            {item.volume ? item.volume : 0} {asset}
        </div>
    );
};

export const renderAction = (action) => {
    const actionUp = ["long", "closeShort"].includes(action);
    const Icon = icons[getIconNameAction(actionUp)];
    return (
        <div className={`${styles.iconLine} ${styles.mobileCardTextValue}`}>
            <div style={colorAction(actionUp)}>{actionUp ? "BUY" : "SELL"}</div>
            <div style={{ marginLeft: 0, marginTop: 1 }}>
                <Icon color={getColor(!actionUp)} size={16} />
            </div>
        </div>
    );
};
