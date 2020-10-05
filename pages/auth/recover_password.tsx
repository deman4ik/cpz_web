import React from "react";
import { RecoverPassword } from "components/pages/AuthPage/RecoverPassword";
import { withApollo } from "libs/hoc";

const Page = () => <RecoverPassword />;

export default withApollo(Page);
