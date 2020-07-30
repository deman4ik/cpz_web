import React from "react";

import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
import { RobotsSearchPage } from "../../src/components/pages/RobotsSearchPage";

const Page = () => <RobotsSearchPage />;

export default withApollo(withAuth(withDevice(Page)));
