import React from "react";

import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
import TradingRobotsInfoPage from "../../src/components/pages/TradingRobotsInfoPage";

const Page = () => <TradingRobotsInfoPage />;

export default withApollo(withAuth(withDevice(Page)));
