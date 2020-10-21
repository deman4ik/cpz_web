/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { onError } from "@apollo/client/link/error";

const getTokenFromCookie = () => {
    if (typeof window !== "undefined") {
        return (
            document.cookie
                .split(";")
                ?.find((row) => row.trim().startsWith("accessToken"))
                ?.split("=")[1] || ""
        );
    }
    return "";
};

const putTokenInCookie = (token) => {
    if (typeof window !== "undefined") document.cookie = `accessToken=${token}; path=/`;
};

export const getAccessToken = getTokenFromCookie;
export const nullifyAccessToken = () => putTokenInCookie("");

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
    const [jwtToken, setToken] = useState(getTokenInfo(getTokenFromCookie()));
    const [refreshToken, { result, error }] = useRefreshToken();

    useEffect(() => {
        if (error) {
            console.error(error);
            localStorage.removeItem("refreshTokenSet");
            redirect({}, "/auth/login");
        }
    }, [error]);

    useEffect(() => {
        onError(({ graphQLErrors }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ extensions, message }) => {
                    if (extensions.code === "invalid-jwt") {
                        setToken(null);
                    }
                });
        });
    }, []);

    useEffect(() => {
        putTokenInCookie(jwtToken.token);
        if (jwtToken.token !== "" && Date.now() >= jwtToken.exp * 1000) {
            refreshToken();
        }
    }, [jwtToken, refreshToken]);

    useEffect(() => {
        if (result?.accessToken) {
            setToken(getTokenInfo(result?.accessToken));
            putTokenInCookie(jwtToken.token);
        }
    }, [result?.accessToken]);

    return [
        jwtToken.token,
        (token) => {
            setToken(getTokenInfo(token));
            putTokenInCookie(jwtToken.token);
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
