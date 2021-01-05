import React, { Fragment, memo } from "react";
import Link from "next/link";
import { event } from "libs/gtag";
import { footerLinks, footerIcons } from "./helpers";
import styles from "./Footer.module.css";

const _Footer: React.FC = () => {
    const hahdleOnClick = (href: string) => {
        event({
            action: "click",
            category: "Landing",
            label: "conversion",
            value: href
        });
    };

    return (
        <div className={styles.footer}>
            <div className={styles.row}>
                <div className={styles.colLinks}>
                    {footerLinks.map((item) => (
                        <Fragment key={item.name}>
                            <Link href={item.href} replace>
                                <a className={styles.navItem} onClick={() => hahdleOnClick(item.href)}>
                                    <span className={styles.navItemText}>{item.name}</span>
                                </a>
                            </Link>
                        </Fragment>
                    ))}
                </div>
                <div className={styles.logoWrapper}>
                    <img className={styles.logoImg} src="/img/logo.png" alt="" />
                </div>
                <div className={styles.rights}>
                    <div className={styles.social}>
                        {footerIcons.map((item) => (
                            <a
                                key={item.icon.name}
                                href={item.href}
                                className={styles.linkWrapper}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => hahdleOnClick(item.href)}>
                                <item.icon />
                            </a>
                        ))}
                    </div>
                    <div className={styles.logoBrand}>
                        <div className={styles.logoText}>
                            &copy; {new Date().getFullYear()} Cryptuoso<sup className={styles.brandRights}>&reg;</sup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Footer = memo(_Footer);
