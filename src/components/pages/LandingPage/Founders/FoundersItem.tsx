import React from "react";
import styles from "./Founders.module.css";

export const FoundersItem = ({ item }) => {
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <img src={item.avatar} alt={item.name} />
                    <p className={styles.colTitle}>{item.name}</p>
                    <p className={styles.colPosition}>{item.position}</p>
                </div>
                <ul className={styles.colText}>
                    {item.profile.split("\n").map((el) => (
                        <li key={el}>{el}</li>
                    ))}
                </ul>

                <div className={styles.colFooter} />
            </div>
        </div>
    );
};
