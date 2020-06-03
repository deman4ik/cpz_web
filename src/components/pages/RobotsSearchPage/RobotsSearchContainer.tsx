import React, { useContext } from "react";

import { useFetchRobots } from "hooks/useFetchRobots";
import useSaveScroll from "hooks/useSaveScroll";
import { RobotsList } from "components/ui/RobotsList";
import { LoadingIndicator } from "components/common";
import { Modals } from "./Modals";
import { formatRobotsData } from "./helpers";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    displayType: string;
    width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, width }) => {

    const { robotsData, counts, loading, isLoadingMore, onFetchMore } = useFetchRobots(displayType, formatRobotsData);
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
            <Modals width={width} />
        </>
    );
};
