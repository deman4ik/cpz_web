import React from "react";
import { ForgotPassword } from "components/pages/AuthPage/ForgotPassword";
import { withApollo } from "libs/hoc";

const Page = () => <ForgotPassword />;

export default withApollo(Page);
