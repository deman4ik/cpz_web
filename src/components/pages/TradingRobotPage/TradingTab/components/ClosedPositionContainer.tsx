import React, { memo } from "react";

import { ClosedPositionsListHeader, RobotPositionItem, RobotPositionCard } from ".";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { Robot, SectionType } from "../../types";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";
import { NoRecentData } from "components/common";
import styles from "./styles/ClosedPositionContainer.module.css";

interface Props {
    robot: Robot;
    handleLoadMore: () => void;
    positions: any;
    recordsCount: number;
    width: number;
    isLoadingMore: boolean;
}

const _ClosedPositionContainer: React.FC<Props> = ({
    robot,
    handleLoadMore,
    isLoadingMore,
    recordsCount,
    width,
    positions
}) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
    return (
        <div className={styles.wrapper}>
            <div className={styles.accordionTitle}>Closed Positions</div>
            {positions && positions.length ? (
                <>
                    <div className={styles.accordionSurface}>
                        {isDesktopView ? (
                            <>
                                <ClosedPositionsListHeader />
                                {positions.map((item) => (
                                    <RobotPositionItem key={item.id} item={item} robot={robot} />
                                ))}
                            </>
                        ) : (
                            <div className={styles.mobileCardContainer}>
                                {positions.map((item) => (
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
                        renderLoadMoreButton={positions.length < recordsCount}
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

export const ClosedPositionContainer = memo(_ClosedPositionContainer);
