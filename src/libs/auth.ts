/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { nullifyAccessToken, putTokenInCookie, useAccessToken } from "./accessToken";
import gql from "graphql-tag";
import { DocumentNode, MutationHookOptions, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import {
    LOGIN,
    LOGIN_TELEGRAM,
    LOGOUT,
    REGISTER,
    ACTIVATE_ACCOUNT,
    PASSWORD_RESET,
    CONFIRM_PASSWORD_RESET,
    CHANGE_EMAIL,
    CONFIRM_CHANGE_EMAIL
} from "graphql/auth/mutations";
import redirect from "libs/redirect";

export const logout = () => {
    nullifyAccessToken();
    localStorage.removeItem("refreshTokenSet");
    redirect({}, "/auth/login");
};

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const writeUserToCache = (client, userId) => {
    client.writeQuery({
        query: gql`
            query {
                userId @client
            }
        `,
        data: {
            userId
        }
    });
};

const setRefreshTokenReceived = () => {
    if (typeof window !== "undefined") localStorage.setItem("refreshTokenSet", "true");
};

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
    (options?: MutationHookOptions) => Promise<any>,
    {
        loading?: boolean;
        success: boolean;
        error: string;
        result?: any;
    }
];

const useAuthMutation = (mutation: DocumentNode, options?: MutationHookOptions): AuthAction => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState(null);

    const [action, { loading, error }] = useMutation(mutation, {
        ...options,
        onCompleted: (data) => {
            if (data && data.result) {
                setSuccess(true);
                setResult(data.result);
                setErrorMessage(error?.graphQLErrors[0]?.message || "");
            }
            if (options?.onCompleted) options.onCompleted(data);
        }
    });

    return [action, { loading, success, error: errorMessage, result }];
};

const useUpdateAccessToken = (mutation: DocumentNode, options?: MutationHookOptions): AuthAction => {
    const [token, setAccessToken] = useAccessToken();
    const [action, { loading, error }] = useAuthMutation(mutation, {
        ...options,
        onCompleted: ({ result }) => {
            if (result && result.accessToken) {
                const { accessToken } = result;
                if (token !== accessToken) {
                    setAccessToken(accessToken);
                    putTokenInCookie(accessToken);
                }
            }
            if (options?.onCompleted) options.onCompleted(result);
        }
    });

    return [action, { loading, success: !!token, error }];
};

const useSetRefreshToken = (mutation: DocumentNode, options?: MutationHookOptions): AuthAction => {
    const [action, { loading, success, error }] = useUpdateAccessToken(mutation, {
        ...options,
        onCompleted: (result) => {
            if (result.accessToken) {
                setRefreshTokenReceived();
            }
            if (options?.onCompleted) options.onCompleted(!!result.accessToken);
        }
    });

    return [action, { loading, success, error }];
};

export const useTelegramLogin = (options?: MutationHookOptions) => {
    return useSetRefreshToken(LOGIN_TELEGRAM, options);
};

export const useEmailLogin = (options?: MutationHookOptions) => {
    return useSetRefreshToken(LOGIN, options);
};

export const useLogout = (): AuthAction => {
    const [, setAccessToken] = useAccessToken();
    const [loggedOut, setLoggedOut] = useState(false);
    const [logoutAction, { loading, error }] = useAuthMutation(LOGOUT, {
        onCompleted: ({ result }) => {
            if (result.result) {
                setAccessToken("");
                setLoggedOut(true);
                logout();
            }
        }
    });

    return [() => logoutAction(), { loading, success: loggedOut, error }];
};

export const useRegistration = (variables: { email: string; password: string }, client): AuthAction => {
    const [register, { loading, error, result }] = useAuthMutation(REGISTER, { variables });

    useEffect(() => {
        if (result?.userId) writeUserToCache(client, result?.userId);
    }, [client, result?.userId]);

    return [register, { loading, success: !!result?.userId, error }];
};

export const useConfirmation = (variables: { userId: string; secretCode: string }): AuthAction => {
    return useSetRefreshToken(ACTIVATE_ACCOUNT, { variables });
};

export const usePasswordReset = (variables: { email: string }, client: any): AuthAction => {
    const [resetPassword, { success, error, result }] = useAuthMutation(PASSWORD_RESET, { variables });

    useEffect(() => {
        if (result?.userId) writeUserToCache(client, result?.userId);
    }, [client, result?.userId]);

    return [resetPassword, { success, error }];
};

export const useResetConfirmation = (variables: {
    userId: string;
    secretCode: string;
    password: string;
}): AuthAction => {
    return useSetRefreshToken(CONFIRM_PASSWORD_RESET, { variables });
};

export const useChangeEmail = (variables: { email: string }): AuthAction => {
    return useAuthMutation(CHANGE_EMAIL, { variables });
};

export const useConfirmChangeEmail = (variables: { secretCode: string }): AuthAction => {
    return useUpdateAccessToken(CONFIRM_CHANGE_EMAIL, { variables });
};

export function fetchAccessToken() {
    return fetch(`https://${process.env.HASURA_URL}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            operationName: "refresh_token",
            query: `mutation refresh_token {
        result: refreshToken {
            accessToken
        }
    }`
        })
    }).then((res) => res.json());
}
