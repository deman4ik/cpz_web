import React from "react";
import { PasswordRecovered } from "../../src/components/pages/AuthPage/PasswordRecovered";
import { withApollo } from "../../src/libs/hoc";

const Page = () => <PasswordRecovered />;

export default withApollo(Page);
