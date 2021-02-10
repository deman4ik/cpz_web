import React, { memo } from "react";
import { aboutusContent } from "./helpres";
import styles from "./index.module.css";

const _Aboutus = () => {
    return (
        <>
            <h2 className={styles.title}>About us</h2>
            <div className={styles.aboutus}>
                <div className={`${styles.grid} ${styles.colText}`}>
                    {aboutusContent.text.split("\n").map((el) => (
                        <p key={el}>{el}</p>
                    ))}
                </div>
            </div>
        </>
    );
};

export const Aboutus = memo(_Aboutus);
