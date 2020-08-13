import React from "react";
// hocs
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import SupportPage from "components/pages/SupportPage";

const PageSuppot = () => <SupportPage />;

export default withApollo(withAuth(withDevice(PageSuppot)));
