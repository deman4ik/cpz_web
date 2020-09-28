import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";
import { RobotsPage } from "components/pages/TradingRobotsInfoPage";

const Page = () => <RobotsPage />;

export default withApollo(withAuth(withDevice(Page)));
