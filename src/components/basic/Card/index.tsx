import React from "react";
//styles
import styles from "./Common.module.css";

export const Card: React.FC<any> = (props: any) => {
    return (
        <div {...props} className={styles.card}>
            {props.children}
        </div>
    );
};
