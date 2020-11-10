import React, { useMemo, useState, useContext } from "react";
import { useRouter } from "next/router";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ManagementTemplate } from "components/layout";
import { PageType } from "config/types";
import { StatsFiltersModal } from "components/ui/Modals/StatsFiltersModal";
import NothingComponent from "components/common/NothingComponent";
import { StatsPageComponent } from "components/pages/StatsPage/StatsPageComponent";
import styles from "../../StatsPage/index.module.css";
import { AuthContext } from "libs/hoc/context";
import { ROBOTS_TOTAL_PERFORMANCE_WITH_STATS } from "graphql/signals/queries";
import { useFilters } from "hooks/useFilters";
import { POLL_INTERVAL } from "config/constants";
import { extractRoute, getFormatData, getSubTitle } from "components/pages/StatsPage/helpers";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { StatsPageButtonToolbar } from "components/pages/StatsPage/StatsPageButtonToolbar";
import { entity, mapQueriesToRoutes, mapRoutesToDisplayTypes } from "components/pages/ManagePage/robotStats/constants";

export const ManageRobotsStats: React.FC = () => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);
    const { width } = useWindowDimensions();
    const router = useRouter();
    const displayType = mapRoutesToDisplayTypes[extractRoute(router.route)];
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);

    const componentEntity = entity[PageType[displayType]];

    const handlePressBack = () => {
        router.back();
    };

    const { selectedFilter, ...restFilterProps } = useFilters(router.query);
    const { asset, exchange } = selectedFilter;

    const { data, loading } = useQueryWithAuth(true, mapQueriesToRoutes[displayType], {
        variables: {
            limit: 1,
            asset: asset ? { _eq: asset } : { _is_null: true },
            exchange: exchange ? { _eq: exchange } : { _is_null: true }
        },
        pollInterval: POLL_INTERVAL
    });

    const formatData = useMemo(() => {
        if (!loading && data) {
            return getFormatData(data.stats[0]);
        }
        return { chartData: null, robotStatistic: null };
    }, [loading, data]);

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((isOpen) => !isOpen);
    };

    return (
        <ManagementTemplate
            navigateBack={handlePressBack}
            title={`${componentEntity} Total Performance`}
            subTitle={getSubTitle(selectedFilter)}
            toolbar={isAuth && <StatsPageButtonToolbar toggleFiltersVisibility={toggleFiltersVisibility} />}
            page={PageType[displayType]}>
            <StatsFiltersModal
                isOpen={isFiltersModalVisible}
                title={`Filter Total ${componentEntity} Performance`}
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
                        fullWidth
                        title={PageType[displayType]}
                    />
                )}
            </>
        </ManagementTemplate>
    );
};
