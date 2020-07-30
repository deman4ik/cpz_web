import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageUserRobots } from "components/pages/ManagePage";

const Page = () => <ManageUserRobots />;

export default withApollo(withAuth(withDevice(Page)));
