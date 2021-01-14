import React from "react";
import { AccountActivated } from "components/pages/AuthPage/AccountActivated";
import { withApollo } from "libs/hoc";

const Page = () => <AccountActivated />;

export default withApollo(Page);
