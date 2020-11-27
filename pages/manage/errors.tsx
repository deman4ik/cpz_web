import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageErrors } from "components/pages/ManagePage";

const Page = () => <ManageErrors />;

export default withApollo(withAuth(withDevice(Page)));