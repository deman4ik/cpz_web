import React from "react";
import { Login } from "../../src/components/pages/AuthPage/Login";
import { withAuth, withApollo } from "../../src/libs/hoc";

const Page = () => <Login />;

export default withApollo(withAuth(Page));
