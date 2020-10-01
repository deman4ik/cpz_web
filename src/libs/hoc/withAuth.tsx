/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";
import nextCookie from "next-cookies";

import { LOCALHOST, EXCLUDE_ROUTES, EXCLUDE_AUTH_ROUTES, EXCLUDE_MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken } from "../accessToken";
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
        console.log(props);
        const { setAuthState } = useContext(AuthContext);
        const [getToken] = useAccessToken({});
        const accessToken = getToken();
        console.log("auth token", accessToken);
        useEffect(() => {
            if (accessToken) {
                setAuthState({
                    isAuth: Boolean(accessToken),
                    user_id: getUserIdFromAccessToken(accessToken),
                    isManager: getUserRoleFromAccesToken(accessToken) === "manager"
                });
            }
        }, [accessToken, setAuthState]);

        return <Page {...{ ...props, accessToken }} />;
    };

    WithAuth.getInitialProps = async (ctx) => {
        const isLanding = ctx.pathname === "/";
        let accessToken = "";
        // if (ctx.res) {
        //     const { refresh_token } = nextCookie(ctx);
        //     if (refresh_token) {
        //         accessToken = await useFetchAccessToken(refresh_token);
        //         if (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) {
        //             redirect(ctx, pathToRedirect);
        //         }
        //     } else if ((!isLanding && !checkPath(ctx.pathname)) || EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)) {
        //         redirect(ctx, pathToRedirect);
        //     }
        //     if (accessToken && !isLanding) {
        //         if (
        //             EXCLUDE_AUTH_ROUTES.includes(ctx.pathname) ||
        //             (EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname) &&
        //                 getUserRoleFromAccesToken(accessToken) !== "manager") // редирект если роль не менеджера
        //         ) {
        //             redirect(ctx, pathToRedirectIfLogin);
        //         }
        //     }
        // } else {
        //     const accessTokenFull = getAccessToken();
        //     accessToken = accessTokenFull.token;
        //     const isLocalhost = window.location.origin === `http://${LOCALHOST}`;
        //     if (accessToken.length === 0) {
        //         accessToken = await useFetchAccessToken(isLocalhost ? hardCodeRefreshToken : undefined, isLocalhost);
        //         if (
        //             (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) ||
        //             EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)
        //         ) {
        //             redirect(ctx, pathToRedirect);
        //         }
        //     } else if (Date.now() >= accessTokenFull.exp * 1000) {
        //         accessToken = await useFetchAccessToken(isLocalhost ? hardCodeRefreshToken : undefined, isLocalhost);
        //         if (
        //             (accessToken.length === 0 && !isLanding && !checkPath(ctx.pathname)) ||
        //             EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)
        //         ) {
        //             redirect(ctx, pathToRedirect);
        //         }
        //     }
        // }
        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
