import React, { memo } from "react";

import { NoRecentData } from "components/common";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";
import { RobotPositionItem, RobotPositionCard, ClosedPositionsListHeader } from ".";

import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { SectionType } from "../../types";

import styles from "./styles/ClosedPositionsList.module.css";

interface Props {
    robot: any;
    handleLoadMore: () => void;
    data: any;
    recordsCount: number;
    isLoadingMore: boolean;
    width: number;
}

const _ClosedPositionsList: React.FC<Props> = ({ robot, handleLoadMore, isLoadingMore, recordsCount, data, width }) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
    return (
        <div className={styles.wrapper}>
            <div className={styles.accordionTitle}>Closed Positions</div>
            {data.length ? (
                <>
                    <div className={styles.accordionSurface}>
                        {isDesktopView ? (
                            <>
                                <ClosedPositionsListHeader />
                                {data.map((item) => (
                                    <RobotPositionItem key={item.id} item={item} robot={robot} />
                                ))}
                            </>
                        ) : (
                            <div className={styles.mobileCardContainer}>
                                {data.map((item) => (
                                    <RobotPositionCard
                                        key={item.id}
                                        item={item}
                                        robot={robot}
                                        activeTab={SectionType.closedPositions}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <RobotsLoadMore
                        renderLoadMoreButton={data.length < recordsCount}
                        isLoadingMore={isLoadingMore}
                        onFetchMore={handleLoadMore}
                    />
                </>
            ) : (
                <div style={{ marginTop: 20 }}>
                    <NoRecentData message="No Closed Positions" />
                </div>
            )}
        </div>
    );
};

export const ClosedPositionsList = memo(_ClosedPositionsList);
