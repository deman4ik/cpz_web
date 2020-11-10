import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";
import TradingRobotsInfoPage from "components/pages/TradingRobotsInfoPage";

const Page = () => <TradingRobotsInfoPage />;

export default withApollo(withAuth(withDevice(Page)));
