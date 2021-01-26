import React, { memo } from "react";
import { RobotPositionCard } from ".";
import { SectionType } from "components/pages/SignalRobotPage/types";
import styles from "./styles/OpenPositionsList.module.css";

interface Props {
    robot: any;
    data: any;
    positionInfo: { title: string; empty: string; activeTab: SectionType };
}

const _OpenPositionsList: React.FC<Props> = ({ data, robot, positionInfo }) => (
    <div className={styles.topCards}>
        <div className={styles.accordionTitle}>{positionInfo.title}</div>
        <div className={styles.topCardsContainer}>
            {data.length ? (
                data.map((item, idx) => (
                    <RobotPositionCard key={idx} item={item} robot={robot} activeTab={positionInfo.activeTab} />
                ))
            ) : (
                <div className={styles.tableCellEmpty}>{positionInfo.empty}</div>
            )}
        </div>
    </div>
);

export const OpenPositionsList = memo(_OpenPositionsList);
