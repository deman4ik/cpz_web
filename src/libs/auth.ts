//import fetch from 'cross-fetch';
import { setAccessToken } from './accessToken';

interface Headers {
  Accept: string;
  [key: string]: any;
}

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    credentials: 'same-origin'
  }
};

const errorMessage = "can't fulfill the request";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const testind = async () => {
  const result = {
    success: false,
    error: 'er'
  };
  await timeout(2000);
  return result;
};

export const testindBool = async () => {
  const result = false;
  await timeout(2000);
  return result;
};

export const loginTelegram = async data => {
  const result = {
    success: false,
    error: ''
  };

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/loginTg`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: config.headers
    });
    const json = await res.json();
    if (json.success) {
      result.success = true;
      setAccessToken(json.accessToken);
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const login = async (data: { email: string; password: string }) => {
  const result = {
    success: false,
    error: ''
  };
  const body = JSON.stringify(data);

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body,
      headers: config.headers
    });
    const json = await res.json();
    if (json.success) {
      result.success = true;
      setAccessToken(json.accessToken);
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const logout = async () => {
  let result = false;

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: config.headers
    });
    const json = await res.json();
    result = json.success;
    if (!result) {
      console.error(json.error);
    }
  } catch (err) {
    console.error(errorMessage);
  }
  return result;
};

export const register = async (
  data: { email: string; password: string },
  client
) => {
  const result = {
    success: false,
    error: ''
  };
  const body = JSON.stringify(data);

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      body,
      headers: config.headers
    });
    const json = await res.json();
    if (json.success) {
      result.success = true;
      client.writeData({
        data: { userId: json.userId }
      });
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const confirm = async (data: { userId: string; secretCode: string }) => {
  const result = {
    success: false,
    error: ''
  };
  const body = JSON.stringify(data);

  try {
    const res = await fetch(
      `${process.env.AUTH_API_URL}/auth/activate-account`,
      {
        method: 'POST',
        credentials: 'include',
        body,
        headers: config.headers
      }
    );
    const json = await res.json();
    if (json.success) {
      setAccessToken(json.accessToken);
      result.success = true;
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const activate = async (encode: string) => {
  let result = false;

  try {
    const data = JSON.parse(Buffer.from(encode, 'base64').toString());
    if (typeof data === 'object') {
      result = (await confirm(data)).success;
    }
  } catch (err) {
    console.error(errorMessage);
  }
  return result;
};

export const reset = async (email: string, client: any) => {
  const result = {
    success: false,
    error: ''
  };
  const body = JSON.stringify({ email });

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/password-reset`, {
      method: 'POST',
      credentials: 'include',
      body,
      headers: config.headers
    });
    const json = await res.json();
    if (json.success) {
      result.success = true;
      client.writeData({
        data: { userId: json.userId }
      });
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const recover = async (data: {
  userId: string;
  secretCode: string;
  password: string;
}) => {
  const result = {
    success: false,
    error: ''
  };
  const body = JSON.stringify(data);

  try {
    const res = await fetch(
      `${process.env.AUTH_API_URL}/auth/confirm-password-reset`,
      {
        method: 'POST',
        credentials: 'include',
        body,
        headers: config.headers
      }
    );
    const json = await res.json();
    if (json.success) {
      result.success = true;
      setAccessToken(json.accessToken);
    } else {
      result.error = json.error;
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const recoverEncoded = async (encode: string, password: string) => {
  let result = {
    success: false,
    error: ''
  };

  try {
    const data = JSON.parse(Buffer.from(encode, 'base64').toString());
    if (typeof data === 'object') {
      result = await recover({
        ...(data as { userId: string; secretCode: string }),
        password
      });
    }
  } catch (err) {
    result.error = 'system error';
    console.error(errorMessage);
  }
  return result;
};

export const fetchAccessToken = async (
  refresh_token?: string,
  isLocalhost = false
) => {
  let accessToken = '';
  const headers: Headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (isLocalhost) {
    headers['x-refresh-token'] = refresh_token;
  }
  if (refresh_token) {
    headers.cookie = `refresh_token=${refresh_token}`;
  }

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers
      //headers: refresh_token ? { ...headers, Cookie: `refresh_token=${refresh_token}` } : headers
    });
    const json = await res.json();
    if (json.success) {
      accessToken = json.accessToken;
    }
  } catch (err) {
    console.error(err);
  }
  return accessToken;
};
