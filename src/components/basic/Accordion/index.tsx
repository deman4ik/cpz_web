import React, { ReactNode, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    title?: ReactNode;
    left?: ReactNode;
}

export const Accordion: React.FC<Props> = ({ title, children, left }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const handleOnClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.container}>
            <div className={[styles.title, styles.ripple].join(" ")} onClick={handleOnClick}>
                {left}
                {title}
                <div className={styles.icon}>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
            </div>
            {isExpanded ? <div>{children}</div> : null}
        </div>
    );
};
