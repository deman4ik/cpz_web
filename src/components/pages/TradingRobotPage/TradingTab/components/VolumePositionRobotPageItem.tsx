import React, { memo } from "react";

import { SectionType } from "components/pages/TradingRobotPage/types";
import { ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import { getIconName, getColor } from "config/utils";
import styles from "./styles/RobotPositionCard.module.css";

interface Props {
    volume: number;
    direction: string;
    asset: string;
    activeTab: SectionType;
}

const components = {
    arrowup: ArrowUpIcon,
    arrowdown: ArrowDownIcon
};

const _VolumePositionRobotPageItem: React.FC<Props> = ({ direction, volume, asset, activeTab }) => {
    const SpecificIcon = components[getIconName(direction)];
    return (
        <div className={`${styles.iconLine} ${styles.mobileCardTextValue}`}>
            {activeTab === SectionType.openPositions && (
                <div style={{ marginLeft: -6, marginRight: 0, marginTop: 1 }}>
                    <SpecificIcon color={getColor(direction === "short")} size={16} />
                </div>
                // <IconButton
                //   size={16}
                //   style={{ marginLeft: -6, marginRight: 0 }}
                //   color={getColor(direction === 'short')}
                //   icon={getIconName(direction)}
                // />
            )}
            {volume} {asset}
        </div>
    );
};

export const VolumePositionRobotPageItem = memo(_VolumePositionRobotPageItem);
