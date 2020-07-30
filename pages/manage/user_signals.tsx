import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import { ManageUserSignals } from "components/pages/ManagePage";

const Page = () => <ManageUserSignals />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
