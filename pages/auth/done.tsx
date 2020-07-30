import React from 'react';
import { Done } from '../../src/components/pages/AuthPage/Done';
import { withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => (
  <Done />
);

export default withHeaders(withApollo(Page));
