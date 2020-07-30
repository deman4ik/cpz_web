import React from 'react';
import { RecoverPassword } from '../../src/components/pages/AuthPage/RecoverPassword';
import { withApollo, withHeaders } from "../../src/libs/hoc";

const Page = () => (
  <RecoverPassword />
);

export default withHeaders(withApollo(Page));
