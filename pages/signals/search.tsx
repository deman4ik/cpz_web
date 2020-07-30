import React from "react";

import { withApollo, withAuth, withDevice, withHeaders } from "../../src/libs/hoc";
import { SignalsSearchPage } from "../../src/components/pages/SignalsSearchPage";

const Page = () => <SignalsSearchPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
