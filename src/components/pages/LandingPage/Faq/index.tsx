import React, { useRef, memo } from "react";
import { FaqItem } from "./FaqItem";
import { faqContent } from "./helpres";
import { useAnchor } from "../helpers";

import styles from "./index.module.css";

const _Faq = () => {
    const half = Math.ceil(faqContent.length / 2);
    const refAnchor = useRef(null);
    const anchor = "faq";
    useAnchor(refAnchor, anchor);

    return (
        <>
            <a ref={refAnchor} id={anchor} className="visually-hidden">
                FAQ
            </a>
            <h2 className={styles.title}>FAQ</h2>
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
