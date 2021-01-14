/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import RobotsPage from "components/pages/common/RobotsInfoPage";
import { RobotsType } from "config/types";

const TradingRobotsInfoPage = () => {
    return <RobotsPage type={RobotsType.robots} />;
};

export default TradingRobotsInfoPage;
