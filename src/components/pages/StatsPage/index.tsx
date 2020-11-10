/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useFilters } from "hooks/useFilters";
import { USER_SIGNAL_ROBOT_STATS_AGGREGATE } from "graphql/signals/queries";
import { POLL_INTERVAL } from "config/constants";
import { DefaultTemplate } from "components/layout";
import { StatsPageButtonToolbar } from "./StatsPageButtonToolbar";
import { StatsPageComponent } from "./StatsPageComponent";
import NothingComponent from "components/common/NothingComponent/";
import { getFormatData, getSubTitle } from "./helpers";
import { capitalize } from "config/utils";
import { PageType } from "config/types";
import styles from "./index.module.css";
import { AuthContext } from "libs/hoc/context";
import { StatsFiltersModal } from "components/ui/Modals/StatsFiltersModal";
import { QueueTypes } from "components/pages/StatsPage/types";

export const StatsPage: React.FC = () => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    const router = useRouter();
    const displayType = router.route.split("/")[1];
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);

    const handlePressBack = () => {
        router.push(`/${displayType}`);
    };

    const { selectedFilter, ...restFilterProps } = useFilters(router.query);
    const { asset, exchange } = selectedFilter;

    const { loading, data } = useQuery(USER_SIGNAL_ROBOT_STATS_AGGREGATE, {
        variables: {
            limit: 1,
            asset: asset ? { _eq: asset } : { _is_null: true },
            exchange: exchange ? { _eq: exchange } : { _is_null: true },
            type: { _eq: QueueTypes[displayType] },
            user_id
        },
        pollInterval: POLL_INTERVAL
    });

    const formatData = useMemo(
        () => (!loading && data ? getFormatData(data.stats[0]) : { chartData: null, robotStatistic: null }),
        [loading, data]
    );

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((prev) => !prev);
    };

    return (
        <DefaultTemplate
            page={PageType[displayType]}
            title={`My ${capitalize(displayType)} Total Performance`}
            subTitle={getSubTitle(selectedFilter)}
            toolbar={isAuth && <StatsPageButtonToolbar toggleFiltersVisibility={toggleFiltersVisibility} />}
            width={width}
            handlePressBack={handlePressBack}>
            <StatsFiltersModal
                isOpen={isFiltersModalVisible}
                title={`Filter My Total ${capitalize(displayType)} Performance`}
                onClose={toggleFiltersVisibility}
                selectedFilter={selectedFilter}
                {...restFilterProps}
            />
            <>
                {!formatData.chartData || !formatData.robotStatistic ? (
                    <div className={styles.loadingContainer}>
                        <NothingComponent beforeButtonKeyWord="stats" buttonSize="normal" />
                    </div>
                ) : (
                    <StatsPageComponent
                        formatData={formatData}
                        width={width}
                        displayType={displayType}
                        title={`My ${capitalize(displayType)} Total Statistics`}
                    />
                )}
            </>
        </DefaultTemplate>
    );
};
