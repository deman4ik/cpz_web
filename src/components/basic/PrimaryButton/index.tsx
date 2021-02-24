import React from "react";
import Link from "next/link";
import { event, gtag_report_conversion } from "libs/gtag";
import styles from "./index.module.css";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

interface Props {
    title: string;
    type: string;
    style?: React.CSSProperties;
    className?: string;
    mini?: boolean;
    href: string;
    gtag_conversation?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ title, type, style, className, mini, href, gtag_conversation }) => {
    const getClassName = () => {
        const composeClass = [styles.btn, mini ? styles.miniBtn : styles.normalBtn, styles[type]];
        if (className) composeClass.push(className);
        return composeClass;
    };

    const handleOnClick = (e) => {
        e.preventDefault();

        if (gtag_conversation) {
            gtag_report_conversion(href);
        } else {
            event({
                action: "click",
                category: "Landing",
                label: "conversion",
                value: href
            });
        }
    };

    return href.indexOf("http") !== 0 ? (
        <Link href={href}>
            <a className={getClassName().join(" ")} style={style} onClick={handleOnClick}>
                {title}
            </a>
        </Link>
    ) : (
        <a href={href} className={getClassName().join(" ")} style={style} onClick={handleOnClick}>
            {title}
        </a>
    );
};
