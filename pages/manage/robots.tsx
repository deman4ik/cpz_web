import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import { ManageRobots } from "components/pages/ManagePage";

const Page = () => <ManageRobots />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
