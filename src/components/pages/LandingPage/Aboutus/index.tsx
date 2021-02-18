import React, { memo } from "react";
import styles from "./index.module.css";

const _Aboutus = () => {
    return (
        <>
            <h2 className={styles.title}>About us</h2>
            <div className={styles.aboutus}>
                <div className={`${styles.grid} ${styles.colText}`}>
                    <p className={styles.epigraph}>
                        If nobody can offer you a product you need - make it by yourself...
                    </p>
                    <p>
                        We started long ago by trading on the stock exchange and was always looking for opportunities to{" "}
                        <b>automate our&nbsp;trading</b>. With the rapid growth of crypto exchanges, manual trading has
                        become even more <b>unpredictable.</b>
                    </p>

                    <p>
                        Advanced traders know about services where you can create your own trading strategy and automate
                        it with a robot. We tried to trade through them, but there is a problem that these robots have a
                        very limited functionality. So in order to really control your trading, you need a tailor-made
                        solution developed from scratch.
                    </p>

                    <p>
                        That&#39;s how and why we created <b>Cryptuoso</b> - a service for automated cryptocurrency
                        trading. Our robots use <b>advanced&nbsp;strategies</b> and do not require users to have any
                        programming skills.
                    </p>

                    <p>
                        We shared our service with our friends, and they convinced us that <b>Cryptuoso</b> should be
                        useful for other crypto-enthusiasts - both for beginners and experienced traders.
                    </p>

                    <p className={styles.welcome}>
                        We are warmly welcome you in the community of a product created by traders and for traders.
                    </p>
                </div>
            </div>
        </>
    );
};

export const Aboutus = memo(_Aboutus);
