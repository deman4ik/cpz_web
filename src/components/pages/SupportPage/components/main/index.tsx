import React from "react";
// components
import StepCard from "./StepCard";
// styles
import styles from "../../styles/Common.module.css";
import stylesMain from "../../styles/Main.module.css";
// contants
import { STEPS_CARDS } from "./constants";

const StepsCards = STEPS_CARDS.map((item, index) => <StepCard {...item} key={index} />);

const Main: React.FC = () => {
    return (
        <div className={styles.content_container}>
            <div className={styles.section_title}>First steps</div>
            {StepsCards}
            <div className={styles.section_title}>Contact Support</div>
            <div className={stylesMain.contact_support_card}>
                <div className={stylesMain.contact_support_card_title}>Telegram Community Support</div>
                <div className={stylesMain.contact_support_card_description}>
                  Having common questions with signals or robots? <br/>Ask it in our Telegram Community and we will help you.
                </div>
            </div>
        </div>
    );
};

export default Main;
