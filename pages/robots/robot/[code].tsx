import React from "react";
import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";

import { RobotsRobotPage } from "../../../src/components/pages/RobotsRobotPage";

const Page = () => <RobotsRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
