/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";
import nextCookie from "next-cookies";

import { LOCALHOST, EXCLUDE_ROUTES, EXCLUDE_AUTH_ROUTES, EXCLUDE_MANAGE_ROUTES } from "config/constants";
import { fetchAccessToken } from "../auth";
import { getAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken } from "../accessToken";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "libs/hoc/context";

const pathToRedirect = "/auth/login";
const pathToRedirectIfLogin = "/robots";

const hardCodeRefreshToken = process.env.DEV_REFRESH_TOKEN;
/*Проверка доступности разрешаемых роутов*/
const checkPath = (path: string) => {
    let match = false;
    EXCLUDE_ROUTES.forEach((route: string) => {
        if (path.includes(route)) {
            match = path.includes(route);
        }
    });

    return match;
};

export const withAuth = (Page) => {
    const WithAuth = (props) => {
        /*Установка контекста аутентификации*/
        const { setAuthState } = useContext(AuthContext);
        useEffect(() => {
            if (props?.accessToken) {
                setAuthState({
                    isAuth: Boolean(props.accessToken),
                    user_id: getUserIdFromAccessToken(props.accessToken),
                    isManager: getUserRoleFromAccesToken(props.accessToken) === "manager"
                });
            }
        }, [props.accessToken, props?.accessToken, setAuthState]);

        return <Page {...props} />;
    };

    WithAuth.getInitialProps = async (ctx) => {
        const isLanding = ctx.pathname === "/";
        let accessToken = "";
        if (ctx.res) {
            const refresh_token =
                ctx.req.headers.host === LOCALHOST ? hardCodeRefreshToken : nextCookie(ctx).refresh_token;
            if (refresh_token) {
                accessToken = await fetchAccessToken(refresh_token);
                if (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) {
                    redirect(ctx, pathToRedirect);
                }
            } else if ((!isLanding && !checkPath(ctx.pathname)) || EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)) {
                redirect(ctx, pathToRedirect);
            }
            if (accessToken && !isLanding) {
                if (
                    EXCLUDE_AUTH_ROUTES.includes(ctx.pathname) ||
                    (EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname) &&
                        getUserRoleFromAccesToken(accessToken) !== "manager") // редирект если роль не менеджера
                ) {
                    redirect(ctx, pathToRedirectIfLogin);
                }
            }
        } else {
            const accessTokenFull = getAccessToken();
            accessToken = accessTokenFull.token;
            const isLocalhost = window.location.origin === `http://${LOCALHOST}`;
            if (accessToken.length === 0) {
                accessToken = await fetchAccessToken(isLocalhost ? hardCodeRefreshToken : undefined, isLocalhost);
                if (
                    (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) ||
                    EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)
                ) {
                    redirect(ctx, pathToRedirect);
                }
            } else if (Date.now() >= accessTokenFull.exp * 1000) {
                accessToken = await fetchAccessToken(isLocalhost ? hardCodeRefreshToken : undefined, isLocalhost);
                if (
                    (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) ||
                    EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)
                ) {
                    redirect(ctx, pathToRedirect);
                }
            }
        }
        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
            accessToken
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
