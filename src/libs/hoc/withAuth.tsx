/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";
import nextCookies from "next-cookies";

import { AUTH_ROUTES, MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccessToken } from "libs/accessToken";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "providers/authContext";
import { LoadingDummy } from "components/pages/LandingPage/SignalsList/LoadingDummy";
import { NextPage, NextPageContext } from "next";
import { NextPageProps } from "config/types";

const loginPath = "/login";
const homePath = "/robots";

export const withAuth = (Page: NextPage) => {
    const WithAuth = (props: NextPageProps) => {
        const { authState, setAuthState } = useContext(AuthContext);
        const [accessToken] = useAccessToken();

        useEffect(() => {
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: Boolean(accessToken),
                user_id: getUserIdFromAccessToken(accessToken),
                isManager: getUserRoleFromAccessToken(accessToken) === "manager",
                authIsSet: true
            }));
        }, [setAuthState, accessToken]);

        return authState.authIsSet ? <Page {...{ ...props, accessToken }} /> : <LoadingDummy />;
    };

    WithAuth.getInitialProps = async (ctx: NextPageContext) => {
        const isLanding = ctx.pathname === "/";
        const { accessToken } = nextCookies(ctx);
        if (ctx.res) {
            if (!isLanding) {
                if (
                    (MANAGE_ROUTES.includes(ctx.pathname) && getUserRoleFromAccessToken(accessToken) !== "manager") ||
                    (getUserIdFromAccessToken(accessToken) && AUTH_ROUTES.includes(ctx.pathname))
                ) {
                    redirect(ctx, homePath);
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
