/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { LOCALHOST } from "config/constants";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";

let accessToken = "";

export const useRefreshToken = (variables): [() => void, { result: any; error: any }] => {
    const [refresh, { data, error }] = useMutation(REFRESH_TOKEN, variables);
    return [() => refresh(variables), { result: data?.result, error: error?.graphQLErrors[0].message }];
};

const constructToken = (token) => {
    const { exp = 0 } = token ? jwtDecode(token) : {};
    return {
        token,
        exp
    };
};

/**
 * Returns access token and a function to update it
 */
export const useAccessToken = (): [string, (token: string) => void] => {
    const [jwtToken, setToken] = useState(constructToken(accessToken));
    const [refreshToken, { result, error }] = useRefreshToken({ refreshToken: accessToken });

    useEffect(() => {
        if (error) {
            redirect({}, "/auth/login");
        }
    }, [error]);

    useEffect(() => {
        if (jwtToken.token !== "" && Date.now() >= jwtToken.exp * 1000) {
            refreshToken();
        }
    }, [jwtToken, refreshToken]);

    useEffect(() => {
        console.log("refresh token", result?.jwtToken);
        if (result?.jwtToken) setToken(result?.jwtToken);
    }, [result?.jwtToken]);

    return [
        jwtToken.token,
        (token) => {
            setToken(constructToken(token));
            accessToken = token;
        }
    ];
};

export const getAccessToken = () => accessToken;

export const getUserIdFromAccessToken = (token): string | null => {
    if (token) {
        const { userId } = jwtDecode(token);
        return userId;
    }
    return null;
};

export const getUserRoleFromAccesToken = (token): string | null => {
    if (token) {
        const { role } = jwtDecode(token);
        return role;
    }
    return null;
};
