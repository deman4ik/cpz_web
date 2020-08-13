import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS_COUNT } from "graphql/manage/queries";
// utils
import { formatTotalUsers } from "../../utils";
// components
import { Card } from "components/basic";
import StatsContainer from "./StatsContainer";
import TimestampStats from "./TimestampStats";

// TODO: работа с шириной в зависимости от других карточек
const UserStats: React.FC<any> = () => {
    /*Fetch data*/
    const { data } = useQuery(GET_USERS_COUNT);

    return (
        <Card style={{ minHeight: "305px", margin: "15px", flexGrow: "0.2" }}>
            {data?.usersTotal && (
                <>
                    <StatsContainer title="Users" data={formatTotalUsers(data)} />
                    <TimestampStats />
                </>
            )}
        </Card>
    );
};

export default UserStats;
