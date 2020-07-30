import React from "react";
import { withApollo, withAuth, withDevice, withHeaders } from "../../src/libs/hoc";

import { SignalsPage } from "../../src/components/pages/SignalsPage";

const Page = () => <SignalsPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
