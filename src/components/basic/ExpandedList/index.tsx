import React, { ReactNode, useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    title?: ReactNode;
    subtitle?: ReactNode;
    isOpen?: boolean;
}

const expandedStyle: React.CSSProperties = {
    zIndex: 999,
    boxShadow: "var(--shadow)",
    backgroundColor: "var(--darkBg)",
    position: "absolute",
    left: 0,
    top: 0,
    transform: "translateX(-100%)",
    width: "300px",
    height: "min-content"
};

export const ExpandedList: React.FC<Props> = ({ title, subtitle, isOpen, children }) => {
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
        <div style={{ position: "relative", height: 24 }}>
            <div ref={ref} className={styles.container} style={{ ...(isExpanded ? expandedStyle : {}) }}>
                <div className={`${styles.accordionHead} ${styles.ripple}`} onClick={handleOnClick}>
                    {title && <div className={styles.title}>{title}</div>}
                    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                    <div className={styles.icon}>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
                </div>
                {isExpanded ? <div className={styles.content}>{children}</div> : null}
            </div>
        </div>
    );
};
