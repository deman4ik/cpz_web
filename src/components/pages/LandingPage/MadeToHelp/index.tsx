import React, { memo } from "react";
import { MadeToHelpItem } from "./MadeToHelpItem";
import { madeToHelpContent } from "./helper";

import styles from "./index.module.css";

const _MadeToHelp = () => {
    return (
        <>
            <h2 className={styles.title}>Cryptuoso is made to help</h2>
            <div className={styles.founders}>
                <div className={styles.grid}>
                    {madeToHelpContent.map((item) => (
                        <MadeToHelpItem key={item.title} item={item} />
                    ))}
                </div>
                <p className={styles.benefits}>
                    Our trading platform is well-suited for long-term investments, because all of our robots trade on
                    the 8 hours and 1 day timeframes.
                </p>
            </div>
        </>
    );
};

export const MadeToHelp = memo(_MadeToHelp);
