import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageRobots } from "../../src/components/pages/ManagePage";

const Page = () => <ManageRobots />;

export default withApollo(withAuth(withDevice(Page)));
