import React from "react";
// hocs
import { withApollo, withAuth, withDevice, withHeaders } from "libs/hoc";
// components
import SupportPage from "components/pages/SupportPage";

const PageSuppot = () => <SupportPage />;

export default withHeaders(withApollo(withAuth(withDevice(PageSuppot))));
