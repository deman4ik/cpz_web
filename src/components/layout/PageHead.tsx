/*eslint-disable react/no-danger*/
import React from "react";
import Head from "next/head";

import { GA_TRACKING_ID, UA_TRACKING_ID, AW_CONVERSION_ID } from "libs/gtag";

interface Props {
    title?: string;
    description?: string;
    keywords?: string;
    gtag?: string;
    userId?: string;
}

const description = "Cryptuoso - Cryptocurrency Trading Robots for your successful investment";
const keywords = "cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken";

export const PageHead: React.FC<Props> = ({ title, gtag, userId }) => (
    <Head>
        <title>CRYPTUOSO - {title}</title>
        <meta charSet="utf-8" />
        <meta name='viewport" content="initial-scale=1.0, width=device-width' key="viewport" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.svg" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        {/*  Global site tag (gtag.js) - Google Analytics */}
        {process.env.ENABLE_ANALYTICS === "development" ? null : (
            <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                        'page_path': window.location.pathname,
                        'user_id': '${userId}'
                        });
                        gtag('config', '${UA_TRACKING_ID}', {
                        'page_path': window.location.pathname,
                        'userId': '${userId}'
                        });
                        gtag('config', '${AW_CONVERSION_ID}');
                        ${gtag || ""}`
                    }}
                />
            </>
        )}
        {process.env.ENABLE_ANALYTICS === "development" ? null : (
            <>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                        ym(69520861, "init", {
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                            userParams: {
                                UserID: '${userId}'
                            }
                        });
                          `
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<div><img src="https://mc.yandex.ru/watch/69520861" style="position:absolute; left:-9999px;" alt="" /></div>`
                    }}
                />
            </>
        )}
        {process.env.ENABLE_ANALYTICS === "development" ? null : (
            <>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '3892002647514527');
                        fbq('track', 'PageView');`
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `
                        <img height="1" width="1" style="display:none"
                        src="https://www.facebook.com/tr?id=3892002647514527&ev=PageView&noscript=1"
                        />`
                    }}
                />
            </>
        )}
        {process.env.ENABLE_ANALYTICS === "development" ? null : (
            <>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(o){var b="https://quickkoala.io/anywhere/",t="88a3a2cee18a4eeeb90c9603fb42d708a5c2538df39442f59fdd32abbd53c35c",a=window.AutopilotAnywhere={_runQueue:[],run:function(){this._runQueue.push(arguments);}},c=encodeURIComponent,s="SCRIPT",d=document,l=d.getElementsByTagName(s)[0],p="t="+c(d.title||"")+"&u="+c(d.location.href||"")+"&r="+c(d.referrer||""),j="text/javascript",z,y;if(!window.Autopilot) window.Autopilot=a;if(o.app) p="devmode=true&"+p;z=function(src,asy){var e=d.createElement(s);e.src=src;e.type=j;e.async=asy;l.parentNode.insertBefore(e,l);};y=function(){z(b+t+'?'+p,true);};if(window.attachEvent){window.attachEvent("onload",y);}else{window.addEventListener("load",y,false);}})({}); 
                        `
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
