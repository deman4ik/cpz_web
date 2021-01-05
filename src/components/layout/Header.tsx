import React, { memo, useContext } from "react";
import Link from "next/link";
import { useLogoutProcess } from "hooks/useLogoutProcess";
import { linksHeader, authHeader } from "./helpers";
import { event } from "libs/gtag";
import logoAccent from "assets/img/logo-accent.png";
import styles from "./Header.module.css";
import { AuthContext } from "libs/hoc/context";
import { LoadingIndicator } from "components/common";

const _Header: React.FC = () => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const [logout, { loading }] = useLogoutProcess();

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
            <div className={styles.btnWrapper} onClick={() => handleOnClick("/")}>
                <Link href="/" replace>
                    <a>
                        <img className={styles.logo} src={logoAccent} alt="logo" height="34" width="34" />
                    </a>
                </Link>

                <Link href="/" replace>
                    <a className={styles.btnTitle}>Cryptuoso</a>
                </Link>
            </div>

            <div className={styles.leftContainer}>
                {linksHeader.map((item, idx) => (
                    <div key={idx} className={styles.btnWrapper} onClick={() => handleOnClick(item.href)}>
                        <Link href={item.href} replace>
                            <a className={styles.btnTitle}>{item.title}</a>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.rightContainer}>
                {isAuth ? (
                    <div className={styles.btnWrapper}>
                        {loading ? (
                            <LoadingIndicator />
                        ) : (
                            <div className={styles.btnTitle} onClick={logout}>
                                Log out
                            </div>
                        )}
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
