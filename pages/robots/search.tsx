import React from "react";

import { withApollo, withAuth, withDevice, withHeaders } from "../../src/libs/hoc";
import { RobotsSearchPage } from "../../src/components/pages/RobotsSearchPage";

const Page = () => <RobotsSearchPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
