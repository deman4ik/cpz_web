import React from "react";

import { useFetchRobots } from "hooks/useFetchRobots";
import useSaveScroll from "hooks/useSaveScroll";
import { RobotsList } from "components/ui/RobotsList";
import { LoadingIndicator } from "components/common";
import { formatRobotsData } from "./helpers";
import { Modals } from "./Modals";

interface Props {
    displayType: string;
    width: number;
}

export const SignalsSearchContainer: React.FC<Props> = ({ width, displayType }) => {
    const { robotsData, counts, loading, isLoadingMore, onFetchMore, refetch } = useFetchRobots(
        displayType,
        formatRobotsData,
        true
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
            <Modals afterClose={refetch} />
        </>
    );
};
