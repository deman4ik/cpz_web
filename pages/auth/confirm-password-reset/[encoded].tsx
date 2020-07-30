import React from "react";
import { RecoverPasswordWeb } from "../../../src/components/pages/AuthPage/RecoverPasswordWeb";
import { withApollo, withHeaders } from "../../../src/libs/hoc";

const Page = () => <RecoverPasswordWeb />;

export default withHeaders(withApollo(Page));
