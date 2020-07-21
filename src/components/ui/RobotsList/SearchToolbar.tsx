/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { useDebounce } from "hooks/useDebounce";
import { SET_SEARCH_PROPS } from "graphql/local/mutations";
import { GET_SEARCH_PROPS } from "graphql/local/queries";
import { SearchInput, CaptionButton } from "components/basic";
import { getSearchProps } from "config/utils";
import styles from "./SearchToolbar.module.css";
/*services*/
import LocalStorageService from "services/localStorageService";
// helpers
import getSearchFromStorage from "./getSearchFromStorage";

interface Props {
    setVisibleToolbarFilters?: () => void;
    displayType: string;
}

const defaultOrderBy = {
    recovery_factor: "desc_nulls_last"
};

export const SearchToolbar: React.FC<Props> = ({ displayType, setVisibleToolbarFilters }) => {
    const initialState = getSearchFromStorage(displayType); // получаем значение поиска из localStorage
    const [value, setValue] = useState(initialState);
    const debounceValue = useDebounce(value, 500);
    const [setFilter] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [{ query: GET_SEARCH_PROPS }] });
    const { data } = useQuery(GET_SEARCH_PROPS);

    const onSignalsSearch = (text) => {
        setValue(text);
    };

    const handleOnPressClearFilter = () => {
        const search = getSearchProps(data, displayType);
        const filters = search && search.filters ? JSON.parse(search.filters) : {};
        const searchFilters = filters.name && filters.name._ilike ? JSON.stringify({ name: filters.name }) : "";
        const variables = {
            filters: searchFilters,
            orders: JSON.stringify(defaultOrderBy),
            type: displayType
        };

        /*Установка сброса фильтров в localStorage*/
        LocalStorageService.writeItems([
            {
                key: `${displayType}_filters`,
                value: JSON.stringify(variables)
            }
        ]);

        setFilter({ variables });
    };

    useEffect(() => {
        const search = getSearchProps(data, displayType);
        const filters = search && search.filters ? JSON.parse(search.filters) : {};
        if (filters.name && filters.name._ilike) {
            setValue(filters.name._ilike.slice(1, -1));
        }
    }, []);

    useEffect(() => {
        const search = getSearchProps(data, displayType);
        const filters = search && search.filters ? JSON.parse(search.filters) : {};
        const variables = {
            filters: JSON.stringify({ ...filters, name: { _ilike: debounceValue ? `%${debounceValue}%` : null } }),
            orders: search && search.orders ? search.orders : "",
            type: displayType
        };

        /*Установка поиска в localStorage*/
        LocalStorageService.writeItems([
            {
                key: `${displayType}_filters`,
                value: JSON.stringify(variables)
            }
        ]);
        setFilter({ variables });
    }, [debounceValue]);

    return (
        <div className={styles.container}>
            <SearchInput value={value} onChange={onSignalsSearch} placeholder={`Search ${displayType}...`} />
            <CaptionButton title="filter" icon="filtervariant" responsive onClick={setVisibleToolbarFilters} />
            <CaptionButton title="clear" icon="filtervariantremove" responsive onClick={handleOnPressClearFilter} />
        </div>
    );
};
