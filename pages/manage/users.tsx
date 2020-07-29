import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageUsers } from "components/pages/ManagePage";

const Page = () => <ManageUsers />;

export default withApollo(withAuth(withDevice(Page)));
