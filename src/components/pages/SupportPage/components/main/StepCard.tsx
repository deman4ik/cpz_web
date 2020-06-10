import React from "react";
import Link from "next/link";
// styles
import styles from "../../styles/Main.module.css";
// contants & types
import { stepsCard, STEP_CARD_ICONS } from "./constants";

const StepCard: React.FC<stepsCard> = ({ title, link, icon }) => {
    const alignContent: React.CSSProperties = { justifyContent: icon ? "baseline" : "center" };
    return (
        <Link href={link}>
            <div className={styles.step_card} style={alignContent}>
                {icon && <div className={styles.step_card_icon}>{STEP_CARD_ICONS[icon]}</div>}
                <div>{title}</div>
            </div>
        </Link>
    );
};

export default StepCard;
