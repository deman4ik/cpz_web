/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from "react";
import Link from "next/link";

import { getAccessToken } from "libs/accessToken";
import { useLogoutProcess } from "hooks/useLogoutProcess";
import { linksHeader, authHeader } from "./helpers";
import { event } from "libs/gtag";
import styles from "./Header.module.css";

interface Props {
    hasHomeButton?: boolean;
}

const _Header: React.FC<Props> = ({ hasHomeButton }) => {
    const { token } = getAccessToken();
    const { logoutProcess } = useLogoutProcess();

    const hahdleOnClick = (href: string) => {
        event({
            action: "click",
            category: "Landing",
            label: "conversion",
            value: href
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                {hasHomeButton && (
                    <div className={styles.btnWrapper} onClick={() => hahdleOnClick("/")}>
                        <Link href="/" replace>
                            <a className={styles.btnTitle}>Cryptuoso</a>
                        </Link>
                    </div>
                )}
                {!!token && (
                    <>
                        {linksHeader.map((item, idx) => (
                            <div key={idx} className={styles.btnWrapper} onClick={() => hahdleOnClick(item.href)}>
                                <Link href={item.href} replace>
                                    <a className={styles.btnTitle}>{item.title}</a>
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>
                {token ? (
                    <div className={styles.btnWrapper}>
                        <div className={styles.btnTitle} onClick={logoutProcess}>
                            Log out
                        </div>
                    </div>
                ) : (
                    <>
                        {authHeader.map((item, idx) => (
                            <div key={idx} className={styles.btnWrapper} onClick={() => hahdleOnClick(item.href)}>
                                <Link href={item.href} replace>
                                    <a className={styles.btnTitle}>{item.title}</a>
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export const Header = memo(_Header);
