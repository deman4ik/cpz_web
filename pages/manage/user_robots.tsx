import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageUserRobots } from "../../src/components/pages/ManagePage";

const Page = () => <ManageUserRobots />;

export default withApollo(withAuth(withDevice(Page)));
