import React, { memo } from "react";

import { Robot, SectionType } from "../types";
import { ClosedPositionsRobotPageItemCard } from "./ClosedPositionsRobotPageItemCard";
import { NoRecentData } from "components/common";
import styles from "./OpenPositionContainer.module.css";

interface Props {
    robot: Robot;
    data: any;
}

const _OpenPositionContainer: React.FC<Props> = ({ data, robot }) => (
    <div className={styles.container}>
        <div className={styles.topCards}>
            <div className={styles.accordionTitle}>Open Positions</div>
            <div className={styles.topCardsContainer}>
                {data && data.positions.length ? (
                    data.positions.map((item) => (
                        <ClosedPositionsRobotPageItemCard
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
