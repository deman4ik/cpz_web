import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { MangeDashboard } from "../../src/components/pages/ManagePage";

const Page = () => <MangeDashboard />;

export default withApollo(withAuth(withDevice(Page)));
