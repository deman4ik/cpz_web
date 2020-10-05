/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
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
 * Returns access token, a function to update it, and a function to fetch refresh call
 */
export const useAccessToken = (): [string, (token: string) => void, () => void] => {
    const [jwtToken, setToken] = useState(getTokenInfo(accessToken));
    const [refreshToken, { result, error }] = useRefreshToken();

    useEffect(() => {
        if (error) {
            console.error(error);
            localStorage.removeItem("refreshTokenSet");
            redirect({}, "/auth/login");
        }
    }, [error]);

    useEffect(() => {
        accessToken = jwtToken.token;
        if (jwtToken.token !== "" && Date.now() >= jwtToken.exp * 1000) {
            refreshToken();
        }
    }, [jwtToken, refreshToken]);

    useEffect(() => {
        if (result?.accessToken) {
            setToken(getTokenInfo(result?.accessToken));
            accessToken = jwtToken.token;
        }
    }, [result?.accessToken]);

    return [
        jwtToken.token,
        (token) => {
            setToken(getTokenInfo(token));
            accessToken = token;
        },
        refreshToken
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
