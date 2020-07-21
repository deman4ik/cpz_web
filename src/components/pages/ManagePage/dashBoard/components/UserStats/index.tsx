import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_STATS } from "graphql/manage/queries";
// utils
import { formatTotalUsers } from "../../utils";
// components
import { Card } from "components/basic";
import StatsContainer from "./StatsContainer";
import TimestampStats from "./TimestampStats";

// TODO: работа с шириной в зависимости от других карточек
const UserStats: React.FC<any> = () => {
    const { data } = useQuery(GET_USER_STATS);

    return (
        <Card style={{ minHeight: "305px", margin: "15px", flexGrow: "0.2" }}>
            {data?.users && (
                <>
                    <StatsContainer title="Users" data={formatTotalUsers(data.users)} />
                    <TimestampStats />
                </>
            )}
        </Card>
    );
};

export default UserStats;
