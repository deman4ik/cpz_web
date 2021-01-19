import React, { memo } from "react";

import { useShowDimension } from "../../../hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { NoRecentData } from "../../common";
import { PerformanceTabItem } from "./PerformanceTabItem";
import { PerformanceTabItemCard } from "./PerformanceTabItemCard";
import { PerformanceTabStatisticts } from "./PerformanceTabStatisticts";
import { capitalize } from "config/utils";
import styles from "./PerformanceTabComponent.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";

interface Props {
    robotStatistic: any;
}

const _PerformanceTabComponent: React.FC<Props> = ({ robotStatistic }) => {
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
    return (
        <>
            {!robotStatistic ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <div className={styles.accordionSurface}>
                    {isDesktopView && <PerformanceTabStatisticts />}
                    <>
                        {Object.keys(robotStatistic).map((subtitle) => (
                            <div key={subtitle}>
                                {isDesktopView ? (
                                    <>
                                        <div className={styles.tableTitle}>
                                            <div className={styles.tableTitleText}>{capitalize(subtitle)}</div>
                                        </div>
                                        {robotStatistic[subtitle].map((item, idx) => (
                                            <PerformanceTabItem key={idx} item={item} />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {robotStatistic[subtitle].map((item, idx) => (
                                            <PerformanceTabItemCard key={idx} item={item} subtitle={subtitle} />
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                </div>
            )}
        </>
    );
};

export const PerformanceTabComponent = memo(_PerformanceTabComponent);
