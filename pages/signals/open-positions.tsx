import React from "react";

import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";

import { RobotsType } from "../../src/config/types";
import { RobotOpenPositionsPage } from "../../src/components/pages/RobotOpenPositionsPage";

const Page = () => <RobotOpenPositionsPage type={RobotsType.signals} />;

export default withApollo(withAuth(withDevice(Page)));
