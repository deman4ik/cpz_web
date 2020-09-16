import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";

import { RobotsRobotPage } from "components/pages/RobotsRobotPage";

const Page = () => <RobotsRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
