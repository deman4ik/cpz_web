/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import RobotsPage from "components/pages/common/RobotsInfoPage";
import { RobotsType } from "config/types";

const SignalRobotsInfoPage = () => {
    return <RobotsPage type={RobotsType.signals} />;
};

export default SignalRobotsInfoPage;
