import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
// graphql
import { SIGNAL_ROBOTS_AGGREGATE } from "graphql/signals/queries";
import { GET_SEARCH_PROPS, GET_SEARCH_LIMIT } from "graphql/local/queries";
import { SET_SEARCH_LIMIT, SET_SEARCH_PROPS } from "graphql/local/mutations";
// constants
import { POLL_INTERVAL } from "config/constants";
import { SHOW_LIMIT, AUTH_QUERIES, QUERY_KEY, DEFAULT_ORDER_BY } from "./constants";
// utils
import { getHash, getSearchProps } from "config/utils";
// services
import LocalStorageService from "services/localStorageService";
// context
import { AuthContext } from "libs/hoc/context";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

//TODO: refactor
export const useFetchRobots = (dispayType: string, formatRobotsData: (v_robot_stats: any) => any) => {
    /*Обработка контекста аутентификации*/
    const {
        authState: { isAuth, user_id, authIsSet }
    } = useContext(AuthContext);
    const QUERIES_TYPE = AUTH_QUERIES[Number(isAuth)];

    /* Получение настроек состояния  страницы localStorage */
    const storageData = LocalStorageService.getItems([`${dispayType}_limit`, `${dispayType}_filters`], "object");
    const storageLimit = Number(storageData[`${dispayType}_limit`]);
    const storageFilters = storageData[`${dispayType}_filters`] && JSON.parse(storageData[`${dispayType}_filters`]);

    const { data: searchProps } = useQuery(GET_SEARCH_PROPS);
    const { data: searchLimit } = useQuery(GET_SEARCH_LIMIT);
    const [limit, setLimit] = useState(storageLimit || searchLimit?.Limit[dispayType]);
    const [filtersQuery, setFiltersQuery] = useState({
        robot: {},
        hash: "",
        order_by: {}
    });
    const [setSearchLimit] = useMutation(SET_SEARCH_LIMIT);
    const [setFilters] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [{ query: GET_SEARCH_PROPS }] });

    const defaultVariables = {
        where: {
            [QUERY_KEY[dispayType]]: { _eq: true },
            ...filtersQuery.robot
        },
        hash: filtersQuery.hash
    };

    const { data: data_count, loading: loading_aggregate, refetch: refetchCounts } = useQueryWithAuth(
        false,
        SIGNAL_ROBOTS_AGGREGATE,
        {
            variables: defaultVariables,
            pollInterval: POLL_INTERVAL
        }
    );

    const variables: any = {
        ...defaultVariables,
        limit,
        offset: 0,
        order_by: [{ id: "asc", stats: filtersQuery.order_by }]
    };

    if (isAuth) variables.user_id = user_id;
    const { data, loading, error, fetchMore, refetch: refetchStats } = useQueryWithAuth(
        false,
        QUERIES_TYPE[dispayType],
        {
            variables,
            pollInterval: POLL_INTERVAL
        }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const robotsData = useMemo(() => (!loading && data ? formatRobotsData(data.robots) : []), [data]);

    /* Установка начального значения фильтров */
    useEffect(() => {
        if (storageFilters) {
            setFilters({ variables: storageFilters });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setFilters]);

    useEffect(() => {
        const addFields = () => {
            const hash = getHash(30);
            const search = getSearchProps(searchProps, dispayType);
            const result: { robot: any; hash: string; order_by: any } =
                !search || !search.filters
                    ? { robot: {}, hash, order_by: DEFAULT_ORDER_BY }
                    : {
                          robot: { ...JSON.parse(search.filters) },
                          hash,
                          order_by: DEFAULT_ORDER_BY
                      };
            result.order_by = search && search.orders ? JSON.parse(search.orders) : DEFAULT_ORDER_BY;
            return result;
        };

        setFiltersQuery(addFields());
    }, [dispayType, searchProps]);

    useEffect(() => {
        if (refetchStats && refetchCounts) {
            refetchStats();
            refetchCounts();
        }
    }, [refetchStats, refetchCounts, filtersQuery]);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const onFetchMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                offset: data && data.robots.length,
                limit: SHOW_LIMIT
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(data && data.robots.length + SHOW_LIMIT);

                /*Запоминание лимита  данных на странице*/
                LocalStorageService.writeItems([
                    {
                        key: `${dispayType}_limit`,
                        value: data && data.robots.length + SHOW_LIMIT
                    }
                ]);

                setSearchLimit({
                    variables: {
                        limit: data && data.robots.length + SHOW_LIMIT,
                        type: dispayType
                    }
                });
                return {
                    robots: [...prev.robots, ...fetchMoreResult.robots]
                };
            }
        });
    };

    return {
        robotsData,
        refetch: refetchStats,
        error,
        counts: data_count?.robots_aggregate?.aggregate.count || 0,
        loading: loading || loading_aggregate,
        isLoadingMore,
        onFetchMore
    };
};
