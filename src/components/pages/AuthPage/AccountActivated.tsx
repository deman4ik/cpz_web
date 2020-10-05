import React, { useEffect } from "react";
import Router from "next/router";

import { CartFooter } from "./common/CartFooter";
import { Footer, PageHead, Header } from "components/layout";
import styles from "./index.module.css";

export const AccountActivated: React.FC = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            Router.push("/robots");
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            <PageHead title="Done!" />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <div className={styles.title}>Done</div>
                        <div className={styles.titleDescription}>You have successfully activated your account!</div>
                    </div>
                    <CartFooter />
                </div>
            </div>
            <Footer />
        </div>
    );
};
