import React from 'react';
import { Login } from '../../src/components/pages/AuthPage/Login';
import { withAuth, withApollo, withHeaders, withDevice } from "../../src/libs/hoc";

const Page = () => (
  <Login />
);

export default withHeaders(withApollo(withAuth(withDevice(Page))));
