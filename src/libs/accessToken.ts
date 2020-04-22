import jwtDecode from 'jwt-decode';
import redirect from './redirect';
import { LOCALHOST } from '../config/constants';
import { fetchAccessToken } from './auth';

const accessToken = {
  token: '',
  exp: 0
};

export const setAccessToken = (token: string) => {
  accessToken.token = token;
  accessToken.exp = 0;
  if (token.length > 0) {
    const { exp } = jwtDecode(accessToken.token);
    accessToken.exp = exp;
  }
};

export const getAccessToken = () => accessToken;

export const getExpiredAccessToken = async (ctx) => {
  if (accessToken.token.length === 0) {
    return accessToken.token;
  }
  let token = '';
  const isLocalhost = (ctx && ctx.headers) ? ctx.headers.host === LOCALHOST : window.location.origin === `http://${LOCALHOST}`;
  if (Date.now() >= accessToken.exp * 1000) {
    token = await fetchAccessToken(isLocalhost ? process.env.DEV_REFRESH_TOKEN : undefined, isLocalhost);
    if (!token) {
      redirect(ctx, '/auth/login');
    }
    setAccessToken(token);
  } else {
    token = getAccessToken().token;
  }
  return token;
};
