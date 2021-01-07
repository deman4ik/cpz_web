/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { FetchResult, MutationFunctionOptions, OperationVariables, useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { AuthContext } from "libs/hoc/context";
import { logout } from "libs/auth";

export const getTokenFromCookie = () => {
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

export const putTokenInCookie = (token: string) => {
    if (typeof window !== "undefined") document.cookie = `accessToken=${token}; path=/`;
};

export const getAccessToken = getTokenFromCookie;
export const nullifyAccessToken = () => putTokenInCookie("");

export const getTokenInfo = (jwt) => {
    const { exp = 0 } = jwt ? jwtDecode(jwt) : {};
    return {
        token: jwt,
        exp
    };
};
function jwtTokenExpired(jwtToken: { token: string; exp: number }) {
    return !jwtToken || Date.now() >= jwtToken.exp * 1000;
}
export const tokenExpired = (token?: { token: string; exp: number }) => {
    const jwtToken = token || getTokenInfo(getTokenFromCookie());
    return jwtTokenExpired(jwtToken);
};

export const useRefreshToken = (): [
    () => void,
    { result: any; error: string },
    (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any>>
] => {
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
                    console.error(`REFRESH TOKEN ERROR: ${e?.message || e}`);
                    logout();
                });
        }
    };
    return [refreshToken, { result: data?.result, error: error?.graphQLErrors[0]?.message }, refresh];
};

/**
 * Returns access token, a function to update it, and a function to fetch refresh call
 */
export const useAccessToken = (): [string, (token: string) => void, () => void] => {
    const [jwtToken, setToken] = useState(getTokenInfo(getTokenFromCookie()));
    const [refreshToken, { result }] = useRefreshToken();
    const { setAuthState } = useContext(AuthContext);

    useEffect(() => {
        if (result?.accessToken) {
            const { accessToken } = result;
            const { userId, role }: { userId: string; role: string } = jwtDecode(accessToken);

            setAuthState((prevState) => ({
                ...prevState,
                isAuth: Boolean(accessToken),
                user_id: userId,
                isManager: role === "manager",
                authIsSet: true
            }));
            setToken(getTokenInfo(accessToken));
        }
    }, []);

    return [
        jwtToken.token,
        (token) => {
            setToken(getTokenInfo(token));
            putTokenInCookie(jwtToken.token);
        },
        refreshToken
    ];
};

export const getUserIdFromAccessToken = (token?: string): string | null => {
    if (token) {
        const { userId } = jwtDecode(token);
        return userId;
    }
    return null;
};

export const getUserRoleFromAccesToken = (token?: string): string | null => {
    if (token) {
        const { role } = jwtDecode(token);
        return role;
    }
    return null;
};
