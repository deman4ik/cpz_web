import React from "react";
import styles from "./OurHappyUser.module.css";

export const OurHappyUser = ({ item }) => {
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <img src={item.avatar} alt={item.name} />
                    <p className={styles.colTitle}>{item.name}</p>
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
