import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import { ManageUserRobots } from "components/pages/ManagePage";

const Page = () => <ManageUserRobots />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
