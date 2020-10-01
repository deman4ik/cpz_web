/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { setAccessToken } from "./accessToken";
import gql from "graphql-tag";
import { DocumentNode, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

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
        result?: any;
    }
];

const useAuthMutation = ({ mutation, variables }: { mutation: DocumentNode; variables?: any }): AuthAction => {
    const [action, { loading, error, data }] = useMutation(mutation);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (data?.result) {
            setSuccess(true);
        }
    }, [data?.result]);

    useEffect(() => {
        setErrorMessage(error?.graphQLErrors[0].message || "");
    }, [error?.graphQLErrors]);

    return [() => action({ variables }), { loading, success, error: errorMessage, result: data?.result }];
};

const useLogin = ({ mutation, variables }): AuthAction => {
    const [login, { loading, success, error, result }] = useAuthMutation({ variables, mutation });

    useEffect(() => {
        if (result?.accessToken) {
            setAccessToken(result?.accessToken);
        }
    }, [result]);

    return [login, { loading, success, error }];
};

export const useTelegramLogin = (variables: { id: any; hash: string }) => {
    return useLogin({ mutation: LOGIN_TELEGRAM, variables });
};

export const useEmailLogin = (variables: { email: string; password: string }) => {
    return useLogin({ mutation: LOGIN, variables });
};

export const useLogout = (): AuthAction => {
    const [logout, { success, error, result }] = useAuthMutation({ mutation: LOGOUT });

    useEffect(() => {
        console.log(result?.accessToken);
        if (result?.accessToken) {
            setAccessToken("");
        }
    }, [result]);

    return [logout, { success, error }];
};

export const useRegistration = (variables: { email: string; password: string }, client): AuthAction => {
    const [register, { loading, success, error, result }] = useAuthMutation({ mutation: REGISTER, variables });

    useEffect(() => {
        if (result?.userId) writeUserToCache(client, result?.userId);
    }, [client, result?.userId]);

    return [register, { loading, success, error }];
};

export const useConfirmation = (variables: { userId: string; secretCode: string }): AuthAction => {
    return useLogin({ mutation: ACTIVATE_ACCOUNT, variables });
};

export const activate = async (encode: string) => {
    let result = false;
    return true;
};

export const usePasswordReset = (variables: { email: string }, client: any): AuthAction => {
    const [resetPassword, { success, error, result }] = useAuthMutation({ mutation: PASSWORD_RESET, variables });

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
    return useLogin({ mutation: CONFIRM_PASSWORD_RESET, variables });
};

export const recoverEncoded = async (encode: string, password: string) => {
    let result = {
        success: false,
        error: ""
    };
    return result;
};

export const useRefreshToken = (): AuthAction => {
    const [refreshToken, { success, error, result }] = useAuthMutation({ mutation: REFRESH_TOKEN });

    useEffect(() => {
        console.log("fetched", result);
        if (result?.refreshToken) setAccessToken(result?.refreshToken);
    }, [result, result?.refreshToken]);

    return [refreshToken, { success, error }];
};
