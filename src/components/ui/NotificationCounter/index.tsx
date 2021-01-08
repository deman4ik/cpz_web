import React, { useContext, useMemo } from "react";

import { GET_NOTIFICATIONS_AGGREGATE } from "graphql/user/queries";
import { useClearNotifications } from "hooks/useClearNotifications";
import { POLL_INTERVAL } from "config/constants";
import { getIndentLength, indent } from "./helpers";
import { AuthContext } from "../../../providers/authContext";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

export const NotificationCounter: React.FC = () => {
    /*auth context*/
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { updateNotifications } = useClearNotifications();
    const { data } = useQueryWithAuth(true, GET_NOTIFICATIONS_AGGREGATE, {
        variables: {
            where: { readed: { _eq: false }, user_id: { _eq: user_id } }
        },
        pollInterval: POLL_INTERVAL
    });

    const count = useMemo(
        () =>
            data && data.notifications_aggregate && data.notifications_aggregate.aggregate.count
                ? data.notifications_aggregate.aggregate.count
                : 0,
        [data]
    );

    return (
        <>
            {data && data.notifications_aggregate && count ? (
                <div className="container" onClick={updateNotifications}>
                    <div className="content">{count > 10 ? "10+" : count}</div>
                    <style jsx>
                        {`
                            .container {
                                background-color: var(--primary);
                                border-radius: 8px;
                                width: min-content;
                                position: absolute;
                                top: 7px;
                                left: ${indent[getIndentLength(count)]}px;
                            }
                            .content {
                                padding: 2px ${count === 1 ? 7 : 4}px;
                                color: white;
                                font-size: 10px;
                            }
                        `}
                    </style>
                </div>
            ) : null}
        </>
    );
};
