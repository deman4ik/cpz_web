import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageRobots } from "components/pages/ManagePage";

const Page = () => <ManageRobots />;

export default withApollo(withAuth(withDevice(Page)));
