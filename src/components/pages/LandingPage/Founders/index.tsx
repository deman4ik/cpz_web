import React, { useRef, memo } from "react";
import { FoundersItem } from "./FoundersItem";
import { foundersContent } from "./helper";
import { useAnchor } from "../helpers";

import styles from "./index.module.css";

const _Founders = () => {
    const refAnchor = useRef(null);
    const anchor = "founders";
    useAnchor(refAnchor, anchor);

    return (
        <>
            <a ref={refAnchor} id={anchor} className="visually-hidden">
                Founders
            </a>
            <h2 className={styles.title}>Founders</h2>
            <div className={styles.founders}>
                <div className={styles.grid}>
                    {foundersContent.map((item) => (
                        <FoundersItem key={item.avatar} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Founders = memo(_Founders);
