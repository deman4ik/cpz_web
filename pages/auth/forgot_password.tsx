import React from "react";
import { ForgotPassword } from "../../src/components/pages/AuthPage/ForgotPassword";
import { withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => <ForgotPassword />;

export default withHeaders(withApollo(Page));
