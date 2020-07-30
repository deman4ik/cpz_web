import React from 'react';
import { Activate } from '../../src/components/pages/AuthPage/Activate';
import { withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => (
  <Activate />
);

export default withHeaders(withApollo(Page));
