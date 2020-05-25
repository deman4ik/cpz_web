/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import useWindowDimensions from "hooks/useWindowDimensions";
import { GET_AGGR_STATISTICS, GET_USER_AGGR_STATS_FILTERS } from "graphql/signals/queries";
import { POLL_INTERVAL } from "config/constants";
import { NoRecentData } from "components/common";
import { useFilters } from "hooks/useFilters";
import { Template } from "components/layout";
import { capitalize } from "config/utils";
import { getFormatData, getSubTitle, getLabelCombinations, getQueueType } from "./helpers";
import { PageType } from "config/types";
import { StatsPageButtonToolbar } from "./StatsPageButtonToolbar";
import { StatsPageComponent } from "./StatsPageComponent";
import { StatsPageFilters } from "./StatsPageFilters";
import { Button, Modal } from "components/basic";
import { CheckedFilters, LabelCombinations } from "./types";
import styles from "./index.module.css";

export const StatsPage: React.FC = () => {
    const { width } = useWindowDimensions();
    const router = useRouter();
    const displayType = router.route.split("/")[1];
    const [isVisibleFilters, setIsVisibleFilters] = useState(false);
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

    const { loading, data } = useQuery(GET_AGGR_STATISTICS, {
        variables: {
            asset: selectedFilter.asset ? { _eq: selectedFilter.asset } : { _is_null: true },
            exchange: selectedFilter.exchange ? { _eq: selectedFilter.exchange } : { _is_null: true },
            type: getQueueType(displayType)
        },
        pollInterval: POLL_INTERVAL
    });

    const { data: dataFilter, loading: loadingFilter } = useQuery(GET_USER_AGGR_STATS_FILTERS, {
        variables: {
            type: getQueueType(displayType)
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

    const setVisibleToolbarFilters = () => {
        setIsVisibleFilters((prev) => !prev);
    };

    const confirmSelectedFilter = () => {
        setIsVisibleFilters(false);
        confirmSelectedFilters();
    };

    return (
        <Template
            page={PageType[displayType]}
            title={`My ${capitalize(displayType)} Total Performance`}
            subTitle={getSubTitle(selectedFilter)}
            toolbar={<StatsPageButtonToolbar setVisibleToolbarFilters={setVisibleToolbarFilters} />}
            width={width}
            handlePressBack={handlePressBack}>
            <Modal
                isOpen={isVisibleFilters}
                title={`Filter My Total ${capitalize(displayType)} Performance`}
                onClose={setVisibleToolbarFilters}>
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
                        <NoRecentData message="No recent data available" />
                    </div>
                ) : (
                    <StatsPageComponent formatData={formatData} width={width} displayType={displayType} />
                )}
            </>
        </Template>
    );
};
