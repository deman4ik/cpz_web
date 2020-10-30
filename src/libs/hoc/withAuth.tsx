/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";

import { AUTH_ROUTES, MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken } from "libs/accessToken";
import nextCookies from "next-cookies";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "libs/hoc/context";
import { LoadingDummy } from "components/pages/LandingPage/SignalsList/LoadingDummy";

const pathToRedirectIfLogin = "/robots";

export const withAuth = (Page) => {
    const WithAuth = (props) => {
        const { authState, setAuthState } = useContext(AuthContext);
        const [accessToken] = useAccessToken();

        useEffect(() => {
            setAuthState({
                isAuth: Boolean(accessToken),
                user_id: getUserIdFromAccessToken(accessToken),
                isManager: getUserRoleFromAccesToken(accessToken) === "manager"
            });
        }, [setAuthState, accessToken]);

        return authState?.authIsSet ? <Page {...{ ...props, accessToken }} /> : <LoadingDummy />;
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
        }
        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
            accessToken
        };
    };

    WithAuth.displayName = `WithAuth(${getDisplayName(Page)})`;

    return WithAuth;
};
