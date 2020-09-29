/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { setAccessToken } from "./accessToken";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import {
    LOGIN,
    LOGIN_TELEGRAM,
    LOGOUT,
    REGISTER,
    REFRESH_TOKEN,
    ACTIVATE_ACCOUNT,
    PASSWORD_RESET,
    CONFIRM_PASSWORD_RESET,
    CHANGE_EMAIL,
    CONFIRM_CHANGE_EMAIL
} from "graphql/auth/mutations";
import { useEffect, useState } from "react";

interface Headers {
    Accept: string;
    [key: string]: any;
}

const config = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "same-origin"
    }
};

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const testind = async () => {
    const result = {
        success: false,
        error: "er"
    };
    await timeout(2000);
    return result;
};

export const testindBool = async () => {
    const result = false;
    await timeout(2000);
    return result;
};

type AuthAction = [
    () => void,
    {
        loading?: boolean;
        success: boolean;
        error: string;
    }
];

const useLogin = (params, mutation): AuthAction => {
    const [login, { loading, error, data }] = useMutation(mutation);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (data?.result.accessToken) {
            setAccessToken(data?.result.accessToken);
            setSuccess(true);
        }
    }, [data?.result.accessToken]);

    useEffect(() => {
        setErrorMessage(error?.graphQLErrors[0].message || "");
    }, [error?.graphQLErrors]);
    return [() => login({ variables: params }), { loading, success, error: errorMessage }];
};

export const useTelegramLogin = (params: { id: any; hash: string }) => {
    return useLogin(params, LOGIN_TELEGRAM);
};

export const useEmailLogin = (params: { email: string; password: string }) => {
    return useLogin(params, LOGIN);
};

export const logout = async () => {
    let result = false;

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: config.headers
        });
        const json = await res.json();
        result = json.success;
        if (!result) {
            console.error(json.error);
        }
    } catch (err) {}
    return result;
};

export const register = async (data: { email: string; password: string }, client) => {
    const result = {
        success: false,
        error: ""
    };
    const body = JSON.stringify(data);

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            body,
            headers: config.headers
        });
        const json = await res.json();
        if (json.success) {
            result.success = true;
            client.writeQuery({
                query: gql`
                    query {
                        userId @client
                    }
                `,
                data: {
                    userId: json.userId
                }
            });
        } else {
            result.error = json.error;
        }
    } catch (err) {}
    return result;
};

export const confirm = async (data: { userId: string; secretCode: string }) => {
    const result = {
        success: false,
        error: ""
    };
    const body = JSON.stringify(data);

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/activate-account`, {
            method: "POST",
            credentials: "include",
            body,
            headers: config.headers
        });
        const json = await res.json();
        if (json.success) {
            setAccessToken(json.accessToken);
            result.success = true;
        } else {
            result.error = json.error;
        }
    } catch (err) {}
    return result;
};

export const activate = async (encode: string) => {
    let result = false;

    try {
        const data = JSON.parse(Buffer.from(encode, "base64").toString());
        if (typeof data === "object") {
            result = (await confirm(data)).success;
        }
    } catch (err) {}
    return result;
};

export const reset = async (email: string, client: any) => {
    const result = {
        success: false,
        error: ""
    };
    const body = JSON.stringify({ email });

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/password-reset`, {
            method: "POST",
            credentials: "include",
            body,
            headers: config.headers
        });
        const json = await res.json();
        if (json.success) {
            result.success = true;
            client.writeQuery({
                query: gql`
                    query {
                        userId @client
                    }
                `,
                data: {
                    userId: json.userId
                }
            });
        } else {
            result.error = json.error;
        }
    } catch (err) {}
    return result;
};

export const recover = async (data: { userId: string; secretCode: string; password: string }) => {
    const result = {
        success: false,
        error: ""
    };
    const body = JSON.stringify(data);

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/confirm-password-reset`, {
            method: "POST",
            credentials: "include",
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
    } catch (err) {}
    return result;
};

export const recoverEncoded = async (encode: string, password: string) => {
    let result = {
        success: false,
        error: ""
    };

    try {
        const data = JSON.parse(Buffer.from(encode, "base64").toString());
        if (typeof data === "object") {
            result = await recover({
                ...(data as { userId: string; secretCode: string }),
                password
            });
        }
    } catch (err) {}
    return result;
};

export const fetchAccessToken = async (refresh_token?: string, isLocalhost = false) => {
    let accessToken = "";
    const headers: Headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (isLocalhost) {
        headers["x-refresh-token"] = refresh_token;
    }
    if (refresh_token) {
        headers.cookie = `refresh_token=${refresh_token}`;
    }

    try {
        const res = await fetch(`${process.env.AUTH_API_URL}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
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
