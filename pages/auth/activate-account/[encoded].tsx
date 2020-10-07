import React from "react";
import { Verification } from "components/pages/AuthPage/Verification";
import { withApollo } from "libs/hoc";

const Page = () => <Verification />;

export default withApollo(Page);
