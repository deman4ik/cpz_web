/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { LOCALHOST } from "config/constants";
import { useRefreshToken } from "./auth";
import { useEffect, useState } from "react";
import { access } from "fs";

const accessToken = {
    token: "",
    exp: 0
};

export const setAccessToken = (token: string) => {
    accessToken.token = token;
    accessToken.exp = 0;
    if (token.length > 0) {
        const { exp } = jwtDecode(accessToken.token);
        accessToken.exp = exp;
    }
};

export const getAccessToken = (ctx) => accessToken;

export const useAccessToken = (ctx) => {
    const [token, setToken] = useState(accessToken.token);
    const [refreshToken, { success, error }] = useRefreshToken();

    useEffect(() => {
        if (!token || error) {
            redirect(ctx, "/auth/login");
        }
    }, [ctx, error, token]);

    useEffect(() => {
        if (token !== accessToken.token) setToken(accessToken.token);
    }, [token]);

    return [
        () => {
            if (token !== "" && Date.now() >= accessToken.exp * 1000) {
                refreshToken();
            }
            return token;
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
