import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageUsers } from "../../src/components/pages/ManagePage";

const Page = () => <ManageUsers />;

export default withApollo(withAuth(withDevice(Page)));
