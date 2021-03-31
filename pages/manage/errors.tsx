import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageErrors } from "../../src/components/pages/ManagePage";

const Page = () => <ManageErrors />;

export default withApollo(withAuth(withDevice(Page)));
