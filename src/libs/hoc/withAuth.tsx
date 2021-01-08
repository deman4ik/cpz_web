/* eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useContext, useEffect } from "react";

import { AUTH_ROUTES, MANAGE_ROUTES } from "config/constants";
import { useAccessToken, getUserIdFromAccessToken, getUserRoleFromAccesToken } from "libs/accessToken";
import nextCookies from "next-cookies";
import { getDisplayName } from "../getDisplayName";
import redirect from "../redirect";
// context
import { AuthContext } from "../../providers/authContext";
import { LoadingDummy } from "components/pages/LandingPage/SignalsList/LoadingDummy";

const loginPath = "/login";
const homePath = "/robots";

export const withAuth = (Page) => {
    const WithAuth = (props) => {
        const { authState, setAuthState } = useContext(AuthContext);
        const [accessToken] = useAccessToken();

        useEffect(() => {
            setAuthState((prevState) => ({
                ...prevState,
                isAuth: Boolean(accessToken),
                user_id: getUserIdFromAccessToken(accessToken),
                isManager: getUserRoleFromAccesToken(accessToken) === "manager",
                authIsSet: true
            }));
        }, [setAuthState, accessToken]);

        return authState.authIsSet ? <Page {...{ ...props, accessToken }} /> : <LoadingDummy />;
    };

    WithAuth.getInitialProps = async (ctx) => {
        const isLanding = ctx.pathname === "/";
        const { accessToken } = nextCookies(ctx);
        if (ctx.res) {
            if (!isLanding) {
                if (
                    (MANAGE_ROUTES.includes(ctx.pathname) && getUserRoleFromAccesToken(accessToken) !== "manager") ||
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
