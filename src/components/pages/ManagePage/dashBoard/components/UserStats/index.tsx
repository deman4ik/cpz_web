import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS_STATS } from "graphql/manage/queries";
// utils
import { formatTotalUsers } from "../../utils";
// components
import { Card } from "components/basic";
import StatsContainer from "./StatsContainer";
import TimestampStats from "./TimestampStats";

/*Filters parts of users data*/
const activeUsersFilter = { status: { _eq: 1 } };
const signalsUsersFilter = { user_signals: { equity: { _is_null: false } } };
const startedRobotsFilter = { user_robots: { equity: { _is_null: false }, status: { _eq: "started" } } };

// TODO: работа с шириной в зависимости от других карточек
const UserStats: React.FC<any> = () => {
    /*Fetch data*/
    const { data: activeUsers } = useQuery(GET_USERS_STATS, {
        variables: { where: activeUsersFilter }
    });
    const { data: usersSignals } = useQuery(GET_USERS_STATS, {
        variables: { where: { ...activeUsersFilter, ...signalsUsersFilter } }
    });
    const { data: startedRobots } = useQuery(GET_USERS_STATS, {
        variables: { where: { ...activeUsersFilter, ...startedRobotsFilter } }
    });

    return (
        <Card style={{ minHeight: "305px", margin: "15px", flexGrow: "0.2" }}>
            {activeUsers?.users && (
                <>
                    <StatsContainer
                        title="Users"
                        data={formatTotalUsers(activeUsers?.users, usersSignals?.users, startedRobots?.users)}
                    />
                    <TimestampStats />
                </>
            )}
        </Card>
    );
};

export default UserStats;
