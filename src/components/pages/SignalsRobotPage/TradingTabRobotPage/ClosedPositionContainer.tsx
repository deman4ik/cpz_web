import React, { memo } from "react";

import { HeaderTradingTabRobotPage } from "./HeaderTradingTabRobotPage";
import { RobotPositionItem } from "./RobotPositionItem";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { RobotPositionCard } from "./RobotPositionCard";
import { SectionType } from "../types";
import styles from "./ClosedPositionContainer.module.css";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";
import { NoRecentData } from "components/common";

interface Props {
    robot: any;
    handleLoadMore: () => void;
    data: any;
    recordsCount: number;
    isLoadingMore: boolean;
    width: number;
}

const _ClosedPositionContainer: React.FC<Props> = ({
    robot,
    handleLoadMore,
    isLoadingMore,
    recordsCount,
    data,
    width
}) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
    return (
        <div className={styles.wrapper}>
            <div className={styles.accordionTitle}>Closed Positions</div>
            {data.length ? (
                <>
                    <div className={styles.accordionSurface}>
                        {isDesktopView ? (
                            <>
                                <HeaderTradingTabRobotPage />
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

export const ClosedPositionContainer = memo(_ClosedPositionContainer);
