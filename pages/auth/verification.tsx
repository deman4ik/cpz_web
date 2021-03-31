import React from "react";
import { Verification } from "../../src/components/pages/AuthPage/Verification";
import { withApollo } from "../../src/libs/hoc";

const Page = () => <Verification />;

export default withApollo(Page);
