import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageDeadLetters } from "../../src/components/pages/ManagePage";

const Page = () => <ManageDeadLetters />;

export default withApollo(withAuth(withDevice(Page)));
