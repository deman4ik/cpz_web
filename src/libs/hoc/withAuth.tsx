/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";
import nextCookie from "next-cookies";

import { LOCALHOST, EXCLUDE_ROUTES, EXCLUDE_AUTH_ROUTES, EXCLUDE_MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken, getAccessToken } from "../accessToken";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "libs/hoc/context";

const pathToRedirect = "/auth/login";
const pathToRedirectIfLogin = "/robots";

/*Проверка доступности разрешаемых роутов*/
const checkPath = (path: string) => {
    let match = false;
    EXCLUDE_ROUTES.forEach((route: string) => {
        match = path.includes(route) || match;
    });

    return match;
};

export const withAuth = (Page) => {
    const WithAuth = (props) => {
        const { setAuthState } = useContext(AuthContext);
        const [accessToken] = useAccessToken();

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
        const accessToken = getAccessToken();
        let refreshToken = "";
        if (ctx.res) {
            refreshToken = nextCookie(ctx).refresh_token;
            if (refreshToken) {
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
                        getUserRoleFromAccesToken(accessToken) !== "manager")
                ) {
                    redirect(ctx, pathToRedirectIfLogin);
                }
            }
        } else if (accessToken.length === 0) {
            if ((!isLanding && !checkPath(ctx.pathname)) || EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)) {
                redirect(ctx, pathToRedirect);
            }
        }
        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
