import React, { memo } from "react";
import { FaqItem } from "./FaqItem";
import { faqContent } from "./helpres";

import styles from "./index.module.css";

const _Faq = () => {
    const half = Math.ceil(faqContent.length / 2);
    return (
        <>
            <h2 className={styles.title}>Faq</h2>
            <div className={styles.wrapper}>
                <div className={styles.gridLeft}>
                    {faqContent.slice(0, half).map((item) => (
                        <FaqItem key={item.title} item={item} />
                    ))}
                </div>
                <div className={styles.gridRight}>
                    {faqContent.slice(-half).map((item) => (
                        <FaqItem key={item.title} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Faq = memo(_Faq);
