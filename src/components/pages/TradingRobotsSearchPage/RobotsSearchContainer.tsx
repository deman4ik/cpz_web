import React from "react";

// hooks
import { useFetchRobots } from "hooks/useFetchRobots";
// components
import useSaveScroll from "hooks/useSaveScroll";
import { RobotsList } from "components/ui/RobotsList";
import { LoadingIndicator } from "components/common";
import { Modals } from "./Modals";
// helpers
import { formatRobotsData } from "./helpers";
import { RobotsType } from "config/types";

interface Props {
    displayType: string;
    width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, width }) => {
    const { robotsData, counts, loading, isLoadingMore, onFetchMore, refetch } = useFetchRobots(
        displayType,
        formatRobotsData
    );
    /*Hook сохранения позиции скролла*/
    useSaveScroll(displayType, loading);
    return (
        <>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : (
                <RobotsList
                    data={robotsData}
                    isLoadingMore={isLoadingMore}
                    onFetchMore={onFetchMore}
                    counts={counts}
                    width={width}
                    displayType={displayType}
                />
            )}
            <Modals width={width} afterClose={refetch} type={RobotsType.robots} />
        </>
    );
};
