import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageDeadLetters } from "components/pages/ManagePage";

const Page = () => <ManageDeadLetters />;

export default withApollo(withAuth(withDevice(Page)));
