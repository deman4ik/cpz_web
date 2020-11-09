import React, { memo } from "react";
import { RobotsPageContainer } from "./RobotsPageContainer";
import { Modals } from "components/pages/SignalRobotsInfoPage/Modals";

interface Props {
    data: any;
    width: number;
    type: string;
    refetch: () => void;
}

const _SignalRobots: React.FC<Props> = ({ data, width, type, refetch }) => {
    return (
        <div>
            <RobotsPageContainer data={data} displayType={type} width={width} />
            <Modals afterClose={refetch} />
        </div>
    );
};

export const SignalRobots = memo(_SignalRobots);
