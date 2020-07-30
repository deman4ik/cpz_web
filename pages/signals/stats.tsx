import React from "react";

import { withApollo, withAuth, withDevice, withHeaders } from "../../src/libs/hoc";
import { StatsPage } from "../../src/components/pages/StatsPage";

const Page = () => <StatsPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
