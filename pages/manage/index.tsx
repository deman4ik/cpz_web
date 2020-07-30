import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import { MangeDashboard } from "components/pages/ManagePage";

const Page = () => <MangeDashboard />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
