import React from "react";
import withSecureHeaders from "next-secure-headers";
import Router from "next/router";

import { pageview } from "../src/libs/gtag";
import "./style.css";
import "../src/assets/static/common.css";
// context
import { AuthContextProvider, LayoutContextProvider } from "libs/hoc/context";

Router.events.on("routeChangeComplete", (url) => pageview(url));

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <LayoutContextProvider>
                <Component {...pageProps} />
            </LayoutContextProvider>
        </AuthContextProvider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component?.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default withSecureHeaders()(MyApp);
