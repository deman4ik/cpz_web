import React, { memo } from "react";
import { FoundersItem } from "./FoundersItem";
import { foundersContent } from "./helpres";

import styles from "./index.module.css";

const _Founders = () => {
    return (
        <>
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
