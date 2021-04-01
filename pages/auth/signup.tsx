import React from "react";
import { SignUp } from "../../src/components/pages/AuthPage/SignUp";
import { withAuth, withApollo } from "../../src/libs/hoc";

const Page = () => <SignUp />;

export default withApollo(withAuth(Page));
