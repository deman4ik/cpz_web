import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";

import { TradingRobotPage } from "components/pages/TradingRobotPage";

const Page = () => <TradingRobotPage />;

export default withApollo(withAuth(withDevice(Page)));
