import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { MangeDashboard } from "components/pages/ManagePage";

const Page = () => <MangeDashboard />;

export default withApollo(withAuth(withDevice(Page)));
