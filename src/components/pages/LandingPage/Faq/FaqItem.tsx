import React, { useState, useRef } from "react";
import { ChevronRightIcon } from "assets/icons/svg";
import styles from "./FaqItem.module.css";

export const FaqItem = ({ item }) => {
    const [itemActive, setActiveState] = useState("");
    const [itemHeight, setHeightState] = useState("0px");
    const [itemRotate, setRotateState] = useState(styles.faqIcon);

    const content = useRef(null);

    const toggleAccordion = () => {
        const isActive = itemActive === "active";
        setActiveState(isActive ? "" : "active");
        setHeightState(isActive ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(isActive ? styles.faqIcon : styles.faqRotate);
    };

    return (
        <div className={styles.faqItem}>
            <a className={styles.faqButton} onClick={toggleAccordion}>
                <p className={`${styles.faqTitle}`}>{item.title}</p>
                <div className={`${itemRotate}`}>
                    <ChevronRightIcon />
                </div>
            </a>
            <div ref={content} style={{ maxHeight: `${itemHeight}` }} className={styles.faqContent}>
                <div className={styles.faqText}>{item.text}</div>
            </div>
        </div>
    );
};
