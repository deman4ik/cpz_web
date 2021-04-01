import React from "react";

import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
import { RobotsSearchPage } from "../../src/components/pages/TradingRobotsSearchPage";

const Page = () => <RobotsSearchPage />;

export default withApollo(withAuth(withDevice(Page)));
