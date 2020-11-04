import React, { ReactNode, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    title?: ReactNode;
    subtitle?: ReactNode;
}

export const Accordion: React.FC<Props> = ({ title, subtitle, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleOnClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className={`${styles.container} ${styles.ripple}`} onClick={handleOnClick}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
                <div className={styles.icon}>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
            </div>
            {isExpanded ? <div>{children}</div> : null}{" "}
        </div>
    );
};
