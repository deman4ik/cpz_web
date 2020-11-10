/*eslint-disable react/no-danger*/
import React from "react";
import Head from "next/head";

import { GA_TRACKING_ID, AW_CONVERSION_ID } from "libs/gtag";

interface Props {
    title?: string;
    description?: string;
    keywords?: string;
    gtag?: string;
}

const description = "Cryptuoso - Cryptocurrency Trading Platform for your successful investment";
const keywords = "cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken";

export const PageHead: React.FC<Props> = ({ title, gtag }) => (
    <Head>
        <title>CRYPTUOSO - {title}</title>
        <meta charSet="utf-8" />
        <meta name='viewport" content="initial-scale=1.0, width=device-width' key="viewport" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
        {/*  Global site tag (gtag.js) - Google Analytics */}
        {process.env.NODE_ENV === "development" ? null : (
            <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          gtag('config', '${AW_CONVERSION_ID}');${gtag || ""}`
                    }}
                />
            </>
        )}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: `{
                "@context" : "http://schema.org",
                "@type" : "SoftwareApplication",
                "image" : "https://cryptuoso.com/img/logo.png"
            }`
            }}
        />
    </Head>
);
