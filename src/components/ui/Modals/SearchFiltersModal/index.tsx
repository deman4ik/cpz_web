/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, memo, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { SEARCH_SIGNALS_FILTERS } from "graphql/signals/queries";
import { GET_SEARCH_PROPS } from "graphql/local/queries";
import { SET_SEARCH_PROPS } from "graphql/local/mutations";
import { LoadingIndicator } from "components/common";
import { Button, Select } from "components/basic";
import { capitalize, getSearchProps } from "config/utils";
import { labels, getFilterData, ordersSortList, ordersSortMethod } from "./helpers";
import { CheckedFilter } from "./types";
import styles from "./index.module.css";
// services
import LocalStorageService from "services/localStorageService";

interface Props {
    onClose: () => void;
    displayType: string;
}

const queryFilter = {
    signals: () => ({ signals: { _eq: true } }),
    robots: () => ({ trading: { _eq: true } })
};

const _SearchFiltersModal: React.FC<Props> = ({ onClose, displayType }) => {
    const [checkedButtons, setCheckedButtons] = useState<CheckedFilter>({ asset: [], exchange: [], timeframe: [] });
    const [inputKey, setInputKey] = useState("recovery_factor");
    const { data, loading } = useQuery(SEARCH_SIGNALS_FILTERS, {
        variables: { where: { robots: queryFilter[displayType]() } }
    });
    const [setFilters] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [{ query: GET_SEARCH_PROPS }] });

    const filterData = useMemo(
        () => (!loading && data ? getFilterData(data.filters) : { asset: [], exchange: [], timeframe: [] }),
        [data, loading]
    );

    useEffect(() => {
        const filtersProps = getSearchProps(data, displayType);
        if (filtersProps) {
            const filters = filtersProps.filters ? JSON.parse(filtersProps.filters) : {};
            const obj = Object.keys(filters)
                .filter((el) => el !== "name")
                .reduce((acc, item) => ({ ...acc, [item]: filters[item]._in ? [...filters[item]._in] : [] }), {});
            setCheckedButtons((prev) => ({ ...prev, ...obj }));
            if (filtersProps.orders) {
                const orders = JSON.parse(filtersProps.orders);
                setInputKey(Object.keys(orders).filter((el) => el !== "id")[0]);
            }
        }
    }, [filterData, data]);

    const handleOnPressItem = (item: string, label: string) => {
        setCheckedButtons((prev) => ({
            ...prev,
            [label]: prev[label].find((el) => el === item)
                ? prev[label].filter((el) => el !== item)
                : [...prev[label], item]
        }));
    };

    const confirmSelectedFilter = () => {
        const filtersProps = getSearchProps(data, displayType);
        const filters = filtersProps && filtersProps.filters ? JSON.parse(filtersProps.filters) : {};
        const searchFilters = Object.keys(filterData).reduce(
            (acc, item) => ({
                ...acc,
                [item]: { _in: checkedButtons[item].length ? [...checkedButtons[item]] : null }
            }),
            {}
        );
        const variables = {
            filters: JSON.stringify({ ...searchFilters, ...(filters.name ? { name: filters.name } : {}) }),
            type: displayType,
            orders: JSON.stringify(ordersSortMethod[inputKey])
        };

        /*Установка запоминания фильтров*/
        LocalStorageService.writeItems([
            {
                key: `${displayType}_filters`,
                value: JSON.stringify(variables)
            }
        ]);

        setFilters({ variables }).then((_result) => {
            onClose();
        });
    };

    const clearFilters = () => {
        setCheckedButtons({ asset: [], exchange: [], timeframe: [] });
    };

    return (
        <>
            <div className={styles.row}>
                <div className={styles.label}>
                    <div className={styles.labelText}>Sort by:</div>
                </div>
                <div className={styles.orderby}>
                    <Select data={ordersSortList} value={inputKey} onValueChange={(value) => setInputKey(value)} />
                </div>
            </div>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={styles.container}>
                    {labels.map((label: string) => (
                        <div key={label} className={styles.row}>
                            <div className={styles.label}>
                                <div className={styles.labelText}>{`${capitalize(label)}:`}</div>
                            </div>
                            <div className={styles.btnContainer}>
                                {filterData[label].map((item) => (
                                    <Button
                                        key={item.key}
                                        type={checkedButtons[label].includes(item.key) ? "rounded-primary" : "rounded"}
                                        title={item.label}
                                        style={{ marginLeft: 5, marginTop: 5 }}
                                        clickable={false}
                                        onClick={() => handleOnPressItem(item.key, label)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={styles.btnsGroup}>
                        <Button title="OK" icon="check" type="success" onClick={confirmSelectedFilter} isUppercase />
                        <Button
                            type="dimmed"
                            width={160}
                            title="clear filter"
                            className={styles.btn}
                            onClick={clearFilters}
                            icon="filtervariantremove"
                            isUppercase
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export const SearchFiltersModal = memo(_SearchFiltersModal);
