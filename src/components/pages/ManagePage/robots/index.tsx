import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// constants
import { ROBOTS_TABLE_HEADER_DATA, COLUMNS_WIDTH } from "./constants";
//graphql
import { GET_ROBOTS } from "graphql/manage/queries";
// utils
import { formatRobotsRows } from "./utils";

const LIMIT_STEP = 10;

const ManageRobots = () => {
    /*States*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [isSearch, setIsSearch] = useState(false);
    const { width } = useWindowDimensions(); // width hook

    /*fetch data*/
    const { data } = useQuery(GET_ROBOTS, {
        variables: { limit }
    });

    /*handlers*/
    const callbackMore = () => {
        setLimit(data.robots.length + LIMIT_STEP);
    };

    return (
        <Template title="Robots" width={width}>
            {data?.robots?.length && (
                <SearchTable
                    columnsWidth={COLUMNS_WIDTH}
                    headerData={ROBOTS_TABLE_HEADER_DATA}
                    tableRows={formatRobotsRows(data.robots)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: 88,
                        handleFetchMore: callbackMore,
                        isSearch
                    }}
                />
            )}
        </Template>
    );
};

export default ManageRobots;
