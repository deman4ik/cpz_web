import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import { ManageUsers } from "components/pages/ManagePage";

const Page = () => <ManageUsers />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
