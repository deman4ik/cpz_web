/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { LOCALHOST } from "config/constants";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";

let accessToken = "";

export const getAccessToken = () => accessToken;

const getTokenInfo = (jwt) => {
    const { exp = 0 } = jwt ? jwtDecode(jwt) : {};
    return {
        token: jwt,
        exp
    };
};

export const useRefreshToken = (): [() => void, { result: any; error: any }] => {
    const [refresh, { data, error }] = useMutation(REFRESH_TOKEN);
    return [() => refresh(), { result: data?.result, error: error?.graphQLErrors[0].message }];
};

/**
 * Returns access token and a function to update it
 */
export const useAccessToken = (): [string, (token: string) => void] => {
    const [jwtToken, setToken] = useState(getTokenInfo(accessToken));
    const [refreshToken, { result, error }] = useRefreshToken();

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
        console.log("refresh token", result?.accessToken);
        if (result?.accessToken) setToken(getTokenInfo(result?.accessToken));
    }, [result?.accessToken]);

    return [
        jwtToken.token,
        (token) => {
            setToken(getTokenInfo(token));
            accessToken = token;
        }
    ];
};

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
