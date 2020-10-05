import React from "react";
import { PasswordRecovered } from "components/pages/AuthPage/PasswordRecovered";
import { withApollo } from "libs/hoc";

const Page = () => <PasswordRecovered />;

export default withApollo(Page);
