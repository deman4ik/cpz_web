import React from 'react';
import { Verification } from '../../src/components/pages/AuthPage/Verification';
import { withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => (
  <Verification />
);

export default withHeaders(withApollo(Page));
