import React, { memo } from "react";
import { RobotsPageContainer } from "./RobotsPageContainer";
import { Modals } from "components/pages/TradingRobotsSearchPage/Modals";

interface Props {
    data: any;
    width: number;
    type: string;
    refetch: () => void;
}

const _SignalRobots: React.FC<Props> = ({ data, width, type, refetch }) => {
    return (
        <>
            <RobotsPageContainer data={data} displayType={type} width={width} />
            <Modals width={width} afterClose={refetch} type={type} />
        </>
    );
};

export const SignalRobots = memo(_SignalRobots);
