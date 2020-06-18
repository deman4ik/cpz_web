import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_STATS } from "graphql/manage/queries";
// utils
import { formatTotalUsers } from "./utils";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import { Card } from "components/basic";
import StatsContainer from "./components/StatsContainer";

const MangeDashboard: React.FC<any> = () => {
    const { data } = useQuery(GET_USER_STATS);
    const { width } = useWindowDimensions();

    return (
        <Template title="Dasboard" subTitle="Users dashboard" width={width}>
            <Card style={{ minHeight: "305px", margin: "15px" }}>
                {data?.users && (
                    <>
                        <StatsContainer title="Total counters" data={formatTotalUsers(data.users)} />
                    </>
                )}
            </Card>
        </Template>
    );
};

export default MangeDashboard;
