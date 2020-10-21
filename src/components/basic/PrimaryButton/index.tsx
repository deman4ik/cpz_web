import React from "react";

import { event, gtag_report_conversion } from "../../../libs/gtag";
import styles from "./index.module.css";
import { useRouter } from "next/router";

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
    const router = useRouter();
    const getClassName = () => {
        const composeClass = [styles.btn, mini ? styles.miniBtn : styles.normalBtn, styles[type]];
        if (className) composeClass.push(className);
        return composeClass;
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        router.push(href);

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

    return (
        <a className={getClassName().join(" ")} style={style} href={href} onClick={handleOnClick}>
            {title}
        </a>
    );
};
