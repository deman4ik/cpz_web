import React from "react";
import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";

import SignalRobotPage from "../../../src/components/pages/SignalRobotPage";

const Page = () => <SignalRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
