import Router from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import { logout } from '../libs/auth';
import { setAccessToken } from '../libs/accessToken';

export const useLogoutProcess = () => {
  const client = useApolloClient();

  const logoutProcess = async () => {
    setAccessToken('');
    await logout();
    await client.clearStore();
    Router.push('/auth/login');
  };

  return { logoutProcess };
};
