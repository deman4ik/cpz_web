import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageSupportRequests } from "components/pages/ManagePage";

const Page = () => <ManageSupportRequests />;

export default withApollo(withAuth(withDevice(Page)));
