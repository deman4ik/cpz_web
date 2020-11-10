import React from "react";
import { useQuery } from "@apollo/client";
import { USERS_BY_ROBOTS_AGGREGATE } from "graphql/manage/queries";
// utils
import { formatTotalUsers } from "../../utils";
// components
import { Card } from "components/basic";
import StatsContainer from "./StatsContainer";
import TimestampStats from "./TimestampStats";
import styles from "../../styles/Dasboard.module.css";

// TODO: работа с шириной в зависимости от других карточек
const UserStats: React.FC<any> = () => {
    /*Fetch data*/
    const { data } = useQuery(USERS_BY_ROBOTS_AGGREGATE);

    return (
        <Card className={styles.card}>
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
