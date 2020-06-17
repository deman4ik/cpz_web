import React from "react";
// styles
import stylesMain from "../../styles/Main.module.css";
import styles from "../../styles/Common.module.css";
// constants & types
import { stepsCard, STEP_CARD_ICONS } from "./constants";

const StepCard: React.FC<stepsCard> = ({ title, icon }) => {
    const alignContent: React.CSSProperties = { justifyContent: icon ? "baseline" : "center" };

    return (
        <div className={stylesMain.step_card} style={alignContent}>
            {icon && <div className={styles.card_icon}>{STEP_CARD_ICONS[icon]}</div>}
            <div>{title}</div>
        </div>
    );
};

export default StepCard;
