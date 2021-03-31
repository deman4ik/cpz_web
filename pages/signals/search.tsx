import React from "react";

import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
import { SignalRobotsSearchPage } from "../../src/components/pages/SignalRobotsSearchPage";

const Page = () => <SignalRobotsSearchPage />;

export default withApollo(withAuth(withDevice(Page)));
