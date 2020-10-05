import React from "react";
import { SignUp } from "components/pages/AuthPage/SignUp";
import { withAuth, withApollo } from "libs/hoc";

const Page = () => <SignUp />;

export default withApollo(withAuth(Page));
