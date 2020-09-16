import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
// graphql
import { ROBOT_AGGREGATE_COUNT } from "graphql/signals/queries";
import { GET_SEARCH_PROPS, GET_SEARCH_LIMIT } from "graphql/local/queries";
import { SET_SEARCH_LIMIT, SET_SEARCH_PROPS } from "graphql/local/mutations";
// constants
import { POLL_INTERVAL } from "config/constants";
import { SHOW_LIMIT, AUTH_QUERIES, QUERY_KEY, QUERY_FILTER, DEFAULT_ORDER_BY } from "./constants";
// utils
import { getHash, getSearchProps } from "config/utils";
// services
import LocalStorageService from "services/localStorageService";
// context
import { AuthContext } from "libs/hoc/context";

export const useFetchRobots = (dispayType: string, formatRobotsData: (v_robots_stats: any) => any) => {
    /*Обработка контекста аутентификации*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);
    const QUERIES_TYPE = AUTH_QUERIES[Number(isAuth)];

    /* Получение настроек состояния  страницы localStorage */
    const storageData = LocalStorageService.getItems([`${dispayType}_limit`, `${dispayType}_filters`], "object");
    const storageLimit = Number(storageData[`${dispayType}_limit`]);
    const storageFilters = storageData[`${dispayType}_filters`] && JSON.parse(storageData[`${dispayType}_filters`]);

    const [counts, setCounts] = useState(0);
    const { data: searchProps } = useQuery(GET_SEARCH_PROPS);
    const { data: searchLimit } = useQuery(GET_SEARCH_LIMIT);
    const [limit, setLimit] = useState(storageLimit || searchLimit.Limit[dispayType]);
    const [filtersQuery, setFiltersQuery] = useState({
        robots: {},
        hash: "",
        order_by: {}
    });
    const [setSearchLimit] = useMutation(SET_SEARCH_LIMIT);
    const [setFilters] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [{ query: GET_SEARCH_PROPS }] });

    const { data: data_count, loading: loading_aggregate, refetch: refetchCounts } = useQuery(ROBOT_AGGREGATE_COUNT, {
        variables: {
            where: {
                [QUERY_KEY[dispayType]]: { _eq: true },
                ...filtersQuery.robots
            },
            hash: filtersQuery.hash
        },
        pollInterval: POLL_INTERVAL
    });

    /*Обработка получения данных*/
    let robotsWhere = { ...filtersQuery.robots };
    if (isAuth) robotsWhere = { ...robotsWhere, ...QUERY_FILTER[dispayType]() };
    const { data, loading, error, fetchMore, refetch: refetchStats } = useQuery(QUERIES_TYPE[dispayType], {
        variables: {
            offset: 0,
            limit,
            hash: filtersQuery.hash,
            order_by: [filtersQuery.order_by, { id: "asc" }],
            where: {
                robots: { ...robotsWhere }
            },
            user_id
        },
        pollInterval: POLL_INTERVAL
    });

    const robotsData = useMemo(() => (!loading && data ? formatRobotsData(data.v_robots_stats) : []), [
        formatRobotsData,
        loading,
        data
    ]);

    /* Установка начального значения фильтров */
    useEffect(() => {
        if (storageFilters) {
            setFilters({ variables: storageFilters });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFilters]);

    useEffect(() => {
        if (!loading_aggregate && data_count && data_count.robots_aggregate && data_count.robots_aggregate.aggregate) {
            setCounts(data_count.robots_aggregate.aggregate.count);
        }
    }, [loading_aggregate, data_count]);

    useEffect(() => {
        const addFields = () => {
            const hash = getHash(30);
            const search = getSearchProps(searchProps, dispayType);
            const result: { robots: any; hash: string; order_by: any } =
                !search || !search.filters
                    ? { robots: {}, hash, order_by: DEFAULT_ORDER_BY }
                    : {
                          robots: { ...JSON.parse(search.filters) },
                          hash,
                          order_by: DEFAULT_ORDER_BY
                      };
            result.order_by = search && search.orders ? JSON.parse(search.orders) : DEFAULT_ORDER_BY;
            return result;
        };

        setFiltersQuery(addFields());
    }, [dispayType, searchProps]);

    useEffect(() => {
        refetchStats();
        refetchCounts();
    }, [refetchStats, refetchCounts, filtersQuery]);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const onFetchMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                offset: data.v_robots_stats.length,
                limit: SHOW_LIMIT
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(data.v_robots_stats.length + SHOW_LIMIT);

                /*Запоминание лимита  данных на странице*/
                LocalStorageService.writeItems([
                    {
                        key: `${dispayType}_limit`,
                        value: data.v_robots_stats.length + SHOW_LIMIT
                    }
                ]);

                setSearchLimit({
                    variables: {
                        limit: data.v_robots_stats.length + SHOW_LIMIT,
                        type: dispayType
                    }
                });
                return {
                    v_robots_stats: [...prev.v_robots_stats, ...fetchMoreResult.v_robots_stats]
                };
            }
        });
    };

    return {
        robotsData,
        error,
        counts,
        loading: loading || loading_aggregate,
        isLoadingMore,
        onFetchMore
    };
};
