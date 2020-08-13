import React, { useContext } from "react";
// components
import StepCard from "./StepCard";
// styles
import styles from "../../styles/Common.module.css";
import stylesMain from "../../styles/Main.module.css";
// constants
import { SIGNALS_CARDS, ROBOTS_CARDS, NOT_AUTH_CARD, TG_CARD, NOT_AUTH_CARD_SECOND } from "./constants";
// auth context
import { AuthContext } from "libs/hoc/authContext";

/*Основные карточки ссылками на документацию*/
const renderStepsCards = (cardsArray) => cardsArray.map((item, index) => <StepCard {...item} key={index} />);

const Main: React.FC = () => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    return (
        <>
            <div className={stylesMain.main_content_container}>
                <div className={stylesMain.main_content_section}>
                    <div className={styles.section_title}>Signals first steps</div>
                    {!isAuth && <StepCard {...NOT_AUTH_CARD} />}
                    {renderStepsCards(SIGNALS_CARDS)}
                </div>
                <div className={stylesMain.main_content_section}>
                    <div className={styles.section_title}>Robots first steps</div>
                    {!isAuth && <StepCard {...NOT_AUTH_CARD} />}
                    {renderStepsCards(ROBOTS_CARDS)}
                </div>
            </div>
            <div className={stylesMain.contact_support_container}>
                <div className={styles.section_title}>Contact support</div>
                <StepCard {...TG_CARD} />
                {!isAuth && <StepCard {...NOT_AUTH_CARD_SECOND} />}
            </div>
        </>
    );
};

export default Main;
