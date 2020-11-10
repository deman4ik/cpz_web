import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageBackTests } from "components/pages/ManagePage";

const Page = () => <ManageBackTests />;

export default withApollo(withAuth(withDevice(Page)));
