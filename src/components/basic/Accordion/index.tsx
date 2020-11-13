import React, { ReactNode, useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    title?: ReactNode;
    subtitle?: ReactNode;
    isOpen?: boolean;
}

export const Accordion: React.FC<Props> = ({ title, subtitle, isOpen, children }) => {
    const [isExpanded, setIsExpanded] = useState(isOpen || false);
    const handleOnClick = () => {
        setIsExpanded(!isExpanded);
    };
    const ref = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div ref={ref}>
            <div className={`${styles.container} ${styles.ripple}`} onClick={handleOnClick}>
                {title && <div className={styles.title}>{title}</div>}
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                <div className={styles.icon}>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
            </div>
            {isExpanded ? <div style={{ position: "relative" }}>{children}</div> : null}{" "}
        </div>
    );
};
