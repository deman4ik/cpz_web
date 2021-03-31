import React from "react";
import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";
// components
import { ManageSupportRequests } from "../../../src/components/pages/ManagePage";

const Page = () => <ManageSupportRequests />;

export default withApollo(withAuth(withDevice(Page)));
