import React from "react";
import { AccountActivated } from "../../src/components/pages/AuthPage/AccountActivated";
import { withApollo } from "../../src/libs/hoc";

const Page = () => <AccountActivated />;

export default withApollo(Page);
