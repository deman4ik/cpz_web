/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { AuthContext } from "libs/hoc/context";

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
const tokenExpired = () => {
    const token = getTokenInfo(getTokenFromCookie());
    return Date.now() >= token.exp * 1000;
};

export const useRefreshToken = (): [() => void, { result: any; error: any }] => {
    const [refresh, { data, error }] = useMutation(REFRESH_TOKEN);

    const refreshToken = () => {
        // if we dont do that, we have multiple concurrent requests refreshing the token
        if (tokenExpired()) {
            nullifyAccessToken();
            refresh()
                .then((res) => {
                    putTokenInCookie(res && res.data.result.accessToken);
                })
                .catch((e) => {
                    localStorage.removeItem("refreshTokenSet");
                    console.error(`REFRESH TOKEN ERROR: ${e.message}`);
                    redirect({}, "/auth/login");
                });
        }
    };
    return [refreshToken, { result: data?.result, error: error?.graphQLErrors[0].message }];
};

/**
 * Returns access token, a function to update it, and a function to fetch refresh call
 */
export const useAccessToken = (): [string, (token: string) => void, () => void] => {
    const [jwtToken, setToken] = useState(getTokenInfo(getTokenFromCookie()));
    const [refreshToken, { result }] = useRefreshToken();
    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.isAuth) {
            setTimeout(() => refreshToken());
        }
    }, [authState.isAuth]);

    useEffect(() => {
        if (result?.accessToken) {
            const { accessToken } = result;
            const { userId, role } = jwtDecode(accessToken);

            setAuthState({
                isAuth: Boolean(accessToken),
                userId,
                isManager: role === "manager"
            });
            setToken(getTokenInfo(accessToken));
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
