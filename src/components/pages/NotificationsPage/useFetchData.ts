/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_AGGREGATE } from "graphql/user/queries";
import { GET_NOTIFICATIONS_PROPS } from "graphql/local/queries";
import { SET_NOTIFICATIONS_PROPS } from "graphql/local/mutations";
import { UPDATE_NOTIFICATIONS } from "graphql/user/mutations";
import { POLL_INTERVAL } from "config/constants";
import { getFormatData, filters } from "./helpers";

const RECORDS_LIMIT = 10;
export const useFetchData = () => {
    const { data: notificationsProps } = useQuery(GET_NOTIFICATIONS_PROPS);
    const [inputSelect, setInputSelect] = useState(notificationsProps.NotificationsProps.filters);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    const [limit, setLimit] = useState(RECORDS_LIMIT);
    const { data, loading, fetchMore, refetch } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit,
            type: filters[inputSelect]
        },
        pollInterval: POLL_INTERVAL,
        notifyOnNetworkStatusChange: changeStatus
    });

    const [updateReaded] = useMutation(UPDATE_NOTIFICATIONS, {
        refetchQueries: [
            {
                query: GET_NOTIFICATIONS_AGGREGATE,
                variables: {
                    where: { readed: { _eq: false }, type: { _in: filters[inputSelect] } }
                }
            }
        ]
    });

    const [setNotificationsFilters] = useMutation(SET_NOTIFICATIONS_PROPS);

    const { data: dataCount, loading: loadingCount, refetch: refetch_aggregate } = useQuery(
        GET_NOTIFICATIONS_AGGREGATE,
        {
            variables: {
                where: { type: { _in: filters[inputSelect] } }
            }
        }
    );

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        fetchMore({
            variables: {
                offset: data.notifications.length,
                limit: RECORDS_LIMIT
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(data.notifications.length + RECORDS_LIMIT);
                return {
                    notifications: [...prev.notifications, ...fetchMoreResult.notifications]
                };
            }
        });
    };

    const formatData = useMemo(() => (!loading && data ? getFormatData(data.notifications) : []), [data, loading]);

    const recordsCount = useMemo(
        () => (!loadingCount && dataCount ? dataCount.notifications_aggregate.aggregate.count : 0),
        [loadingCount, dataCount]
    );

    useEffect(() => {
        const unreadData = formatData.filter((el) => !el.readed).map((el) => el.id);
        if (unreadData.length) {
            updateReaded({
                variables: {
                    _set: { readed: true },
                    where: { id: { _in: unreadData } }
                }
            });
        }
    }, [formatData]);

    useEffect(() => {
        refetch();
        refetch_aggregate();
    }, [inputSelect]);

    const setFilters = (value: string) => {
        setNotificationsFilters({
            variables: {
                filters: value
            }
        }).then((result) => {
            setInputSelect(result.data.setNotificationsProps);
            setChangeStatus(true);
        });
    };

    useEffect(() => {
        if (!loading) {
            setChangeStatus(false);
        }
    }, [loading]);

    return {
        isLoadingMore,
        recordsCount,
        formatData,
        handleLoadMore,
        loading: loading || loadingCount,
        inputSelect,
        setFilters
    };
};
