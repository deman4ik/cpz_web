import React from "react";

import { withApollo, withAuth, withDevice, withHeaders } from "../../src/libs/hoc";
import { RobotsPage } from "../../src/components/pages/RobotsPage";

const Page = () => <RobotsPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
