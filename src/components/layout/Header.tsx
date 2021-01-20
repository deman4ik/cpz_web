import React, { memo, useContext } from "react";
import Link from "next/link";
import { useLogoutProcess } from "hooks/useLogoutProcess";
import { linksHeader, authHeader } from "./helpers";
import { event } from "libs/gtag";
import styles from "./Header.module.css";
import { AuthContext } from "providers/authContext";
import { LoadingIndicator } from "components/common";
import { CryptuosoLogo } from "../../assets/icons/svg";

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
                <Link href="/">
                    <a>
                        <CryptuosoLogo size={34} />
                    </a>
                </Link>

                <Link href="/">
                    <a className={styles.btnTitle}>Cryptuoso</a>
                </Link>
            </div>

            <div className={styles.leftContainer}>
                {linksHeader.map((item) => (
                    <div key={item.title} className={styles.btnWrapper} onClick={() => handleOnClick(item.href)}>
                        <Link href={item.href}>
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
                            <div>
                                <Link href="/">
                                    <a className={styles.btnTitle} onClick={logout}>
                                        Log out
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {authHeader.map((item) => (
                            <div
                                key={item.title}
                                className={styles.btnWrapper}
                                onClick={() => handleOnClick(item.href)}>
                                <Link href={item.href}>
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
