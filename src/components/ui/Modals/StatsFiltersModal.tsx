import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "components/pages/StatsPage/index.module.css";
import { StatsPageFilters } from "components/pages/StatsPage/StatsPageFilters";
import { Button, Modal } from "components/basic";
import { useLazyQuery } from "@apollo/client";
import { FILTERS_FOR_AGGREGATED_USER_SIGNAL_ROBOTS_STATS } from "graphql/signals/queries";
import { getLabelCombinations, getQueueType } from "components/pages/StatsPage/helpers";
import { CheckedFilters } from "components/pages/StatsPage/types";

interface StatsFiltersModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    selectedFilter?: CheckedFilters;
    checkedFilters: CheckedFilters;
    confirmSelectedFilters: () => void;
    checkFilterButton: (label: string, item: string) => void;
    clearFilters: () => void;
}
const emptyFilters = { exchange: [], asset: [] };
export const StatsFiltersModal: FC<StatsFiltersModalProps> = ({
    isOpen,
    title,
    onClose,
    checkedFilters,
    confirmSelectedFilters,
    checkFilterButton,
    clearFilters
}) => {
    const [skipFilterQuery, setSkipFilterQuery] = useState(false);

    const getOppositeFilterName = (filterName: string) => (filterName === "asset" ? "exchange" : "asset");

    const [getData, { data, loading }] = useLazyQuery(FILTERS_FOR_AGGREGATED_USER_SIGNAL_ROBOTS_STATS);

    useEffect(() => {
        if (getData) {
            getData();
        }
    }, [getData]);

    const labelCombinations = useMemo(() => {
        if (!loading && data) {
            setSkipFilterQuery(true);
            return getLabelCombinations(data.filters);
        }
        return [];
    }, [loading, data]);

    const getAvailableFilters = (field: string, filter?: string, oppositeFilter?: string): string[] => {
        const oppositeFilterName: string = getOppositeFilterName(field);
        return (
            data &&
            data.filters
                .filter((item) =>
                    item[field] === filter && oppositeFilter
                        ? item[oppositeFilterName] === oppositeFilter
                        : item[oppositeFilterName] !== null
                )
                .map((item) => item[oppositeFilterName])
        );
    };

    const availableFilters = useMemo(() => {
        const filters = emptyFilters;
        if (!skipFilterQuery) {
            return filters;
        }
        Object.keys(checkedFilters).forEach((item) => {
            filters[getOppositeFilterName(item)] = getAvailableFilters(item, checkedFilters[item]);
        });
        return filters;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skipFilterQuery, checkedFilters]);

    const confirmSelectedFilter = () => {
        confirmSelectedFilters();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} title={title} onClose={onClose}>
            <div className={styles.filtersContainer}>
                <div style={{ marginTop: 5 }}>
                    {Object.keys(labelCombinations).map((el: string) => {
                        const oppositeName = getOppositeFilterName(el);
                        const checkedFiltersForEl = checkedFilters[el];
                        return (
                            <StatsPageFilters
                                key={el}
                                label={el}
                                labelsCombination={labelCombinations[el]}
                                filterItem={{
                                    items: getAvailableFilters(
                                        oppositeName,
                                        checkedFilters[oppositeName],
                                        checkedFiltersForEl
                                    ),
                                    label: el
                                }}
                                checkedItem={checkedFiltersForEl}
                                availableFilters={availableFilters[el]}
                                checkFilterButton={checkFilterButton}
                            />
                        );
                    })}
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
    );
};
