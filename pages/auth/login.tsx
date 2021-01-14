import React from "react";
import { Login } from "components/pages/AuthPage/Login";
import { withAuth, withApollo } from "libs/hoc";

const Page = () => <Login />;

export default withApollo(withAuth(Page));
