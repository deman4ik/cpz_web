import React from 'react';
import { SignUp } from '../../src/components/pages/AuthPage/SignUp';
import { withAuth, withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => (
  <SignUp />
);

export default withHeaders(withApollo(Page));
