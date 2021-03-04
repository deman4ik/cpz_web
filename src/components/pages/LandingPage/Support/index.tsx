import React, { useRef, memo } from "react";

import { SupportItem } from "./SupportItem";
import { useAnchor, supportContent } from "../helpers";
import styles from "./index.module.css";

const _Support: React.FC = () => {
    const refAnchor = useRef(null);
    const anchor = "support";
    useAnchor(refAnchor, anchor);

    return (
        <>
            <a ref={refAnchor} id={anchor} className="visually-hidden">
                Support
            </a>
            <h2 className={styles.title}>Support</h2>
            <div className={styles.support}>
                <div className={styles.grid}>
                    {supportContent.map((item) => (
                        <SupportItem item={item} key={item.icon} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Support = memo(_Support);
