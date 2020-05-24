import React from "react";

import { useFetchRobots } from "../../../hooks/useFetchRobots";
import { RobotsList } from "../../ui/RobotsList";
import { LoadingIndicator } from "../../common";
import { Modals } from "./Modals";
import { formatRobotsData } from "./helpers";

interface Props {
    displayType: string;
    width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, width }) => {
    const { robotsData, counts, loading, isLoadingMore, onFetchMore } = useFetchRobots(displayType, formatRobotsData);

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
            <Modals width={width} />
        </>
    );
};
