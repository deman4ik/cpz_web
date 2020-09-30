/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import jwtDecode from "jwt-decode";
import redirect from "./redirect";
import { LOCALHOST } from "config/constants";
import { useFetchAccessToken } from "./auth";

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
    console.log(accessToken);
};

export const getAccessToken = () => accessToken;

export const getExpiredAccessToken = (ctx) => {
    const [fetchToken, info] = useFetchAccessToken();
    if (accessToken.token.length === 0) {
        return accessToken.token;
    }

    if (Date.now() >= accessToken.exp * 1000) {
        fetchToken();
        if (!token) {
            redirect(ctx, "/auth/login");
        }
        setAccessToken(token);
        console.log(info);
    } else {
        token = getAccessToken().token;
    }
    return token;
};

/**
 *  Функция получения user_id из jwt токена
 */
export const getUserIdFromAccessToken = (token): string | null => {
    if (token) {
        const { userId } = jwtDecode(token);
        return userId;
    }
    return null;
};

/**
 *  Функция получения роли пользователея
 */
export const getUserRoleFromAccesToken = (token): string | null => {
    if (token) {
        const { role } = jwtDecode(token);
        return role;
    }
    return null;
};
