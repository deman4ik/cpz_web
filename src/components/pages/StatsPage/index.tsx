/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import { useFilters } from "hooks/useFilters";
// graphql
import {
    USER_SIGNAL_ROBOT_STATS_AGGREGATE,
    FILTERS_FOR_AGGREGATED_USER_SIGNAL_ROBOTS_STATS
} from "graphql/signals/queries";
// constants
import { POLL_INTERVAL } from "config/constants";
// components
import { DefaultTemplate } from "components/layout";
import { StatsPageButtonToolbar } from "./StatsPageButtonToolbar";
import { StatsPageComponent } from "./StatsPageComponent";
import { StatsPageFilters } from "./StatsPageFilters";
import { Button, Modal } from "components/basic";
import NothingComponent from "components/common/NothingComponent/";
// helpers
import { getFormatData, getSubTitle, getLabelCombinations, getQueueType } from "./helpers";
import { capitalize } from "config/utils";
// types
import { PageType } from "config/types";
import { CheckedFilters, LabelCombinations } from "./types";
// styles
import styles from "./index.module.css";
// context
import { AuthContext } from "libs/hoc/context";

export const StatsPage: React.FC = () => {
    /*Контекст аутентификации*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    const router = useRouter();
    const displayType = router.route.split("/")[1];
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);
    const [filtersCombinations, setFiltersCombinations] = useState<CheckedFilters[]>([]);
    const [labelCombinations, setLabelCombinations] = useState<LabelCombinations>({ exchange: [], asset: [] });
    const [skipFilterQuery, setSkipFilterQuery] = useState(false);
    const { exchange: _exchange, asset: _asset } = router.query;
    const { checkedFilters, clearFilters, checkFilterButton, selectedFilter, confirmSelectedFilters } = useFilters(
        _exchange,
        _asset
    );
    const handlePressBack = () => {
        router.push(`/${displayType}`);
    };

    const { loading, data } = useQuery(USER_SIGNAL_ROBOT_STATS_AGGREGATE, {
        variables: {
            asset: selectedFilter.asset ? { _eq: selectedFilter.asset } : { _is_null: true },
            exchange: selectedFilter.exchange ? { _eq: selectedFilter.exchange } : { _is_null: true },
            type: getQueueType(displayType),
            user_id
        },
        pollInterval: POLL_INTERVAL
    });

    const { data: dataFilter, loading: loadingFilter } = useQuery(FILTERS_FOR_AGGREGATED_USER_SIGNAL_ROBOTS_STATS, {
        variables: {
            type: getQueueType(displayType),
            user_id
        },
        skip: skipFilterQuery
    });

    const getOppositeFilterName = (filterName: string) => (filterName === "asset" ? "exchange" : "asset");

    const getAvailableFilters = (field: string, filter?: string, oppositeFilter?: string): string[] => {
        const oppositeFilterName: string = getOppositeFilterName(field);
        return !oppositeFilter
            ? filtersCombinations
                  .filter((item) => item[field] === filter && item[oppositeFilterName] !== null)
                  .map((item) => item[oppositeFilterName])
            : filtersCombinations
                  .filter((item) => item[field] === filter && item[oppositeFilterName] === oppositeFilter)
                  .map((item) => item[oppositeFilterName]);
    };

    useEffect(() => {
        if (!loadingFilter && dataFilter) {
            setFiltersCombinations(dataFilter.filters);
            setLabelCombinations(getLabelCombinations(dataFilter.filters));
            setSkipFilterQuery(true);
        }
    }, [loadingFilter, dataFilter]);

    const availableFilters = useMemo(() => {
        if (!skipFilterQuery) return { exchange: [], asset: [] };
        const filters = { exchange: [], asset: [] };
        Object.keys(checkedFilters).forEach((item) => {
            filters[getOppositeFilterName(item)] = getAvailableFilters(item, checkedFilters[item]);
        });
        return filters;
    }, [skipFilterQuery, checkedFilters]);

    useEffect(() => {
        if (skipFilterQuery) {
            const url = `/${displayType}/stats?exchange=${selectedFilter.exchange}&asset=${selectedFilter.asset}`;
            if (typeof window !== "undefined") {
                window.history.pushState("", "", url);
            }
        }
    }, [skipFilterQuery, selectedFilter]);

    const formatData = useMemo(
        () => (!loading && data ? getFormatData(data.stats) : { chartData: null, robotStatistic: null }),
        [loading, data]
    );

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((prev) => !prev);
    };

    const confirmSelectedFilter = () => {
        setFiltersModalVisibility(false);
        confirmSelectedFilters();
    };

    return (
        <DefaultTemplate
            page={PageType[displayType]}
            title={`My ${capitalize(displayType)} Total Performance`}
            subTitle={getSubTitle(selectedFilter)}
            toolbar={isAuth && <StatsPageButtonToolbar toggleFiltersVisibility={toggleFiltersVisibility} />}
            width={width}
            handlePressBack={handlePressBack}>
            <Modal
                isOpen={isFiltersModalVisible}
                title={`Filter My Total ${capitalize(displayType)} Performance`}
                onClose={toggleFiltersVisibility}>
                <div className={styles.filtersContainer}>
                    <div style={{ marginTop: 5 }}>
                        {Object.keys(labelCombinations).map((el: string) => (
                            <StatsPageFilters
                                key={el}
                                label={el}
                                labelsCombination={labelCombinations[el]}
                                filterItem={{
                                    items: getAvailableFilters(
                                        getOppositeFilterName(el),
                                        checkedFilters[getOppositeFilterName(el)],
                                        checkedFilters[el]
                                    ),
                                    label: el
                                }}
                                checkedItem={checkedFilters[el]}
                                availableFilters={availableFilters[el]}
                                checkFilterButton={checkFilterButton}
                            />
                        ))}
                    </div>
                    <div className={styles.btnsGroup}>
                        <Button title="OK" icon="check" type="success" onClick={confirmSelectedFilter} isUppercase />
                        <Button
                            type="dimmed"
                            width={160}
                            title="clear filter"
                            style={{ marginLeft: 15 }}
                            onClick={clearFilters}
                            icon="close"
                            isUppercase
                        />
                    </div>
                </div>
            </Modal>
            <>
                {!formatData.chartData || !formatData.robotStatistic ? (
                    <div className={styles.loadingContainer}>
                        <NothingComponent beforeButtonKeyWord="stats" buttonSize="normal" />
                    </div>
                ) : (
                    <StatsPageComponent formatData={formatData} width={width} displayType={displayType} />
                )}
            </>
        </DefaultTemplate>
    );
};
