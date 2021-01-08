import React from "react";
import { AppContext, AppProps } from "next/app";
import withSecureHeaders from "next-secure-headers";
import Router from "next/router";

import { pageview } from "libs/gtag";
import "./style.css";
import "../src/assets/static/common.css";
import { AuthContextProvider } from "../src/providers/authContext";
import { LayoutContextProvider } from "../src/providers/layoutContext";
import { NextPageProps } from "../src/types";

Router.events.on("routeChangeComplete", (url) => pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <LayoutContextProvider>
                <Component {...pageProps} />
            </LayoutContextProvider>
        </AuthContextProvider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
    let pageProps: NextPageProps = {};

    if (Component?.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default withSecureHeaders()(MyApp);
