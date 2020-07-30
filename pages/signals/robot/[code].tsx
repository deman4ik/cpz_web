import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "../../../src/libs/hoc";

import { SignalsRobotPage } from "../../../src/components/pages/SignalsRobotPage";

const Page = () => <SignalsRobotPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
