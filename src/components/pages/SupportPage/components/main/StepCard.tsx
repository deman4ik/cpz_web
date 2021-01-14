import React from "react";
// styles
import stylesMain from "../../styles/Main.module.css";
import styles from "../../styles/Common.module.css";
// constants & types
import { stepsCard } from "./constants";

/*icons constants*/
export const ICON_SIZE = 35;
export const ICON_COLOR = "#ffffff";

const StepCard: React.FC<stepsCard> = ({ title, icon }) => {
    const Icon = icon;
    return (
        <div className={stylesMain.step_card}>
            {icon && (
                <div className={styles.card_icon}>
                    <Icon size={ICON_SIZE} color={ICON_COLOR} />
                </div>
            )}
            <div className={styles.cardContent}>{title}</div>
        </div>
    );
};

export default StepCard;
