import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";

import { RobotsType } from "config/types";
import { RobotOpenPositionsPage } from "components/pages/RobotOpenPositionsPage";

const Page = () => <RobotOpenPositionsPage type={RobotsType.signals} />;

export default withApollo(withAuth(withDevice(Page)));
