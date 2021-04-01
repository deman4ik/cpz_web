import React from "react";
import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";

import { TradingRobotPage } from "../../../src/components/pages/TradingRobotPage";

const Page = () => <TradingRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
