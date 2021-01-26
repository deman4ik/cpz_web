import React, { memo } from "react";

import { Robot, SectionType } from "components/pages/TradingRobotPage/types";
import { RobotPositionCard } from ".";
import { NoRecentData } from "components/common";
import styles from "./styles/OpenPositionContainer.module.css";

interface Props {
    robot: Robot;
    positions: any;
}

const _OpenPositionContainer: React.FC<Props> = ({ positions, robot }) => (
    <div className={styles.container}>
        <div className={styles.topCards}>
            <div className={styles.accordionTitle}>Open Positions</div>
            <div className={styles.topCardsContainer}>
                {positions && positions.length ? (
                    positions.map((item) => (
                        <RobotPositionCard
                            key={item.id}
                            item={item}
                            robot={robot}
                            activeTab={SectionType.openPositions}
                        />
                    ))
                ) : (
                    <div style={{ marginTop: 20 }}>
                        <NoRecentData message="No Open Positions" />
                    </div>
                )}
            </div>
        </div>
    </div>
);

export const OpenPositionContainer = memo(_OpenPositionContainer);
