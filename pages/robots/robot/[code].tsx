import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "../../../src/libs/hoc";

import { RobotsRobotPage } from "../../../src/components/pages/RobotsRobotPage";

const Page = () => <RobotsRobotPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
