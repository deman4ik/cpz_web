import React, { memo } from "react";
import { PerformanceEmpty } from "./PerformanceEmpty";
import { PerformanceComponent } from "./PerformanceComponent";

interface Props {
    width: number;
    type: string;
    data: any;
}

const _RobotPerformance: React.FC<Props> = ({ width, type, data }) => {
    return !data || !data?.length ? (
        <PerformanceEmpty width={width} displayType={type} />
    ) : (
        <PerformanceComponent width={width} formatData={data} displayType={type} />
    );
};

export const RobotPerformance = memo(_RobotPerformance);
