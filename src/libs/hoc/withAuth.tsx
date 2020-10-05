/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect, useRef } from "react";

import { EXCLUDE_ROUTES, EXCLUDE_AUTH_ROUTES, EXCLUDE_MANAGE_ROUTES } from "config/constants";
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
        const [accessToken, , refreshToken] = useAccessToken();
        const haveRefreshed = useRef(false);
        const refreshTokenSet =
            typeof window !== "undefined" ? Boolean(localStorage.getItem("refreshTokenSet")) : false;

        useEffect(() => {
            if (!accessToken && refreshTokenSet && !haveRefreshed.current) {
                refreshToken();
                haveRefreshed.current = true;
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
        const accessToken = getAccessToken(); // server-side, does not return the token
        if (ctx.res) {
            console.log(ctx.req);
            if ((!isLanding && !checkPath(ctx.pathname)) || EXCLUDE_MANAGE_ROUTES.includes(ctx.pathname)) {
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
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
            accessToken
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
