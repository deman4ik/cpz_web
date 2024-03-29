/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useFilters } from "hooks/useFilters";
import { USER_AGRR_STATS } from "graphql/signals/queries";
import { POLL_INTERVAL } from "config/constants";
import { DefaultTemplate } from "components/layout";
import { StatsPageButtonToolbar } from "./StatsPageButtonToolbar";
import { StatsPageComponent } from "./StatsPageComponent";
import NothingComponent from "components/common/NothingComponent/";
import { getFormatData, getSubTitle } from "./helpers";
import { capitalize } from "config/utils";
import { PageType } from "config/types";
import styles from "./index.module.css";
import { AuthContext } from "providers/authContext";
import { StatsFiltersModal } from "components/ui/Modals/StatsFiltersModal";
import { QueueTypes } from "components/pages/StatsPage/types";

export const StatsPage: React.FC = () => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const router = useRouter();
    const displayType = router.route.split("/")[1];
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);

    const handlePressBack = () => {
        router.push(`/${displayType}`);
    };

    const { selectedFilter, ...restFilterProps } = useFilters(router.query);
    const { asset, exchange } = selectedFilter;

    const { loading, data } = useQuery(USER_AGRR_STATS, {
        variables: {
            limit: 1,
            asset: asset || "-",
            exchange: exchange || "-",
            type: QueueTypes[displayType],
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
            handleBackNavigation={handlePressBack}>
            <StatsFiltersModal
                isOpen={isFiltersModalVisible}
                title={`Filter My Total ${capitalize(displayType)} Performance`}
                onClose={toggleFiltersVisibility}
                selectedFilter={selectedFilter}
                type={QueueTypes[displayType]}
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
                        displayType={displayType}
                        title={`My ${capitalize(displayType)} Total Statistics`}
                    />
                )}
            </>
        </DefaultTemplate>
    );
};
