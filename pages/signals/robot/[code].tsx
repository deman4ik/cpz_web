import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";

import SignalRobotPage from "components/pages/SignalRobotPage";

const Page = () => <SignalRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
