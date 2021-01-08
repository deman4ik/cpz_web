import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_AGGREGATE } from "graphql/user/queries";
import { GET_NOTIFICATIONS_PROPS } from "graphql/local/queries";
import { SET_NOTIFICATIONS_PROPS } from "graphql/local/mutations";
import { UPDATE_NOTIFICATIONS } from "graphql/user/mutations";
import { POLL_INTERVAL } from "config/constants";
import { parseNotifications, filters } from "./helpers";
// context
import { AuthContext } from "../../../providers/authContext";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { useScrollPosition } from "hooks/useScrollPosition";

const RECORDS_LIMIT = 10;
export const useFetchNotifications = (preserveScrollPosition?: boolean) => {
    const { preservePosition, restorePosition } = useScrollPosition();

    /*auth context*/
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data: notificationsProps } = useQuery(GET_NOTIFICATIONS_PROPS);
    const [inputSelect, setInputSelect] = useState(notificationsProps.NotificationsProps.filters);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    const [limit, setLimit] = useState(RECORDS_LIMIT);

    let where = { user_id: { _eq: user_id } };
    if (filters[inputSelect]) {
        where = { ...where, ...{ type: { _in: filters[inputSelect] } } };
    }

    const [notifications, setNotificationsData] = useState([]);

    const { data, loading, fetchMore, refetch } = useQueryWithAuth(true, GET_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit,
            where
        },
        pollInterval: POLL_INTERVAL,
        notifyOnNetworkStatusChange: changeStatus
    });

    useEffect(() => {
        if (preserveScrollPosition) preservePosition();
        if (data?.notifications) setNotificationsData(parseNotifications(data.notifications));
        if (preserveScrollPosition) restorePosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.notifications]);

    const [updateReaded] = useMutation(UPDATE_NOTIFICATIONS, {
        refetchQueries: [
            {
                query: GET_NOTIFICATIONS_AGGREGATE,
                variables: {
                    where: { readed: { _eq: false }, type: { _in: filters[inputSelect] }, user_id: { _eq: user_id } }
                }
            }
        ]
    });

    const [setNotificationsFilters] = useMutation(SET_NOTIFICATIONS_PROPS);

    const { data: dataCount, loading: loadingCount, refetch: refetch_aggregate } = useQueryWithAuth(
        true,
        GET_NOTIFICATIONS_AGGREGATE,
        {
            variables: {
                where: { type: { _in: filters[inputSelect] }, user_id: { _eq: user_id } }
            }
        }
    );

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                offset: limit,
                limit: RECORDS_LIMIT
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    notifications: [...prev.notifications, ...fetchMoreResult.notifications]
                };
            }
        })
            .catch((e) => console.error(e))
            .finally(() => {
                setLimit(limit + RECORDS_LIMIT);
                setIsLoadingMore(false);
            });
    };

    const recordsCount = useMemo(
        () => (!loadingCount && dataCount ? dataCount.notifications_aggregate.aggregate.count : 0),
        [loadingCount, dataCount]
    );

    useEffect(() => {
        const unreadData = notifications.filter((el) => !el.readed).map((el) => el.id);
        if (unreadData.length) {
            updateReaded({
                variables: {
                    _set: { readed: true },
                    where: { id: { _in: unreadData } }
                }
            });
        }
    }, [updateReaded, notifications]);

    useEffect(() => {
        if (refetch && refetch_aggregate) {
            refetch();
            refetch_aggregate();
        }
    }, [refetch_aggregate, refetch, inputSelect]);

    const setFilters = (value: string) => {
        setNotificationsFilters({
            variables: {
                filters: value
            }
        }).then((result) => {
            setInputSelect(result.data.setNotificationsProps);
            setChangeStatus(true);
            refetch();
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
        notifications,
        handleLoadMore,
        loading: loading || loadingCount,
        inputSelect,
        setFilters
    };
};
