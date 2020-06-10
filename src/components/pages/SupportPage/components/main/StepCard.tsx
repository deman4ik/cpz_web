import React from "react";
// styles
import styles from "../../styles/Main.module.css";
// contants & types
import { stepsCard, STEP_CARD_ICONS } from "./constants";

const StepCard: React.FC<stepsCard> = ({ title, link, icon }) => {
    const handleClick = () => {
        window.location.href = link;
    };

    const alignContent: React.CSSProperties = { justifyContent: icon ? "baseline" : "center" };

    return (
        <div className={styles.step_card} style={alignContent} onClick={handleClick}>
            {icon && <div className={styles.step_card_icon}>{STEP_CARD_ICONS[icon]}</div>}
            <div>{title}</div>
        </div>
    );
};

export default StepCard;
