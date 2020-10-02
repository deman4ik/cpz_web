import React, { memo, useContext } from "react";
import Link from "next/link";

import { useLogoutProcess } from "hooks/useLogoutProcess";
import { linksHeader, authHeader } from "./helpers";
import { event } from "libs/gtag";
import styles from "./Header.module.css";
import { AuthContext } from "libs/hoc/context";

interface Props {
    hasHomeButton?: boolean;
}

const _Header: React.FC<Props> = ({ hasHomeButton }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const { logoutProcess } = useLogoutProcess();

    const handleOnClick = (href: string) => {
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
                    <div className={styles.btnWrapper} onClick={() => handleOnClick("/")}>
                        <Link href="/" replace>
                            <a className={styles.btnTitle}>Cryptuoso</a>
                        </Link>
                    </div>
                )}
                {isAuth && (
                    <>
                        {linksHeader.map((item, idx) => (
                            <div key={idx} className={styles.btnWrapper} onClick={() => handleOnClick(item.href)}>
                                <Link href={item.href} replace>
                                    <a className={styles.btnTitle}>{item.title}</a>
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>
                {isAuth ? (
                    <div className={styles.btnWrapper}>
                        <div className={styles.btnTitle} onClick={logoutProcess}>
                            Log out
                        </div>
                    </div>
                ) : (
                    <>
                        {authHeader.map((item, idx) => (
                            <div key={idx} className={styles.btnWrapper} onClick={() => handleOnClick(item.href)}>
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
