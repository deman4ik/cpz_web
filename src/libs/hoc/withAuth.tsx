/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";

import { ROUTES, AUTH_ROUTES, MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken, getAccessToken } from "libs/accessToken";
import nextCookies from "next-cookies";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "libs/hoc/context";

const pathToRedirect = "/auth/login";
const pathToRedirectIfLogin = "/robots";

const validatePath = (path: string) => {
    let match = false;
    ROUTES.forEach((route: string) => {
        match = path.includes(route) || match;
    });
    return match;
};

export const withAuth = (Page) => {
    const WithAuth = (props) => {
        const { setAuthState } = useContext(AuthContext);
        const [accessToken, , refreshToken] = useAccessToken();
        const refreshTokenSet =
            typeof window !== "undefined" ? Boolean(localStorage.getItem("refreshTokenSet")) : false;

        useEffect(() => {
            if (!accessToken && refreshTokenSet) {
                refreshToken();
            }
        });

        useEffect(() => {
            setAuthState({
                isAuth: Boolean(accessToken),
                user_id: getUserIdFromAccessToken(accessToken),
                isManager: getUserRoleFromAccesToken(accessToken) === "manager"
            });
        }, [setAuthState, accessToken]);

        return <Page {...{ ...props, accessToken }} />;
    };

    WithAuth.getInitialProps = async (ctx) => {
        const isLanding = ctx.pathname === "/";
        const { accessToken } = nextCookies(ctx);

        if (ctx.res) {
            if (accessToken && !isLanding) {
                if (
                    AUTH_ROUTES.includes(ctx.pathname) ||
                    (MANAGE_ROUTES.includes(ctx.pathname) && getUserRoleFromAccesToken(accessToken) !== "manager")
                ) {
                    redirect(ctx, pathToRedirectIfLogin);
                }
            }
        } else if (accessToken.length === 0) {
            if ((!isLanding && !validatePath(ctx.pathname)) || MANAGE_ROUTES.includes(ctx.pathname)) {
                redirect(ctx, pathToRedirect);
            }
        }
        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
            accessToken,
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
