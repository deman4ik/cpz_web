import React, { useContext } from "react";
// components
import StepCard from "./StepCard";
// styles
import styles from "../../styles/Common.module.css";
import stylesMain from "../../styles/Main.module.css";
// constants
import { STEPS_CARDS, NOT_AUTH_CARD, TG_CARD, NOT_AUTH_CARD_SECOND } from "./constants";
// auth context
import { AuthContext } from "libs/hoc/authContext";

/*Основные карточки ссылками на документацию*/
const StepsCards = STEPS_CARDS.map((item, index) => <StepCard {...item} key={index} />);

const Main: React.FC = () => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    return (
        <>
            <div className={stylesMain.main_content_container}>
                <div className={stylesMain.main_content_section}>
                    <div className={styles.section_title}>First steps</div>
                    {!isAuth && <StepCard {...NOT_AUTH_CARD} />}
                    {StepsCards}
                </div>
                <div className={stylesMain.main_content_section}>
                    <div className={styles.section_title}>Contact Support</div>
                    <div className={stylesMain.contact_support_container}>
                        <StepCard {...TG_CARD} />
                    </div>
                </div>
            </div>
            {!isAuth && (
                <div className={stylesMain.last_step_card_container}>
                    <StepCard {...NOT_AUTH_CARD_SECOND} />
                </div>
            )}
        </>
    );
};

export default Main;
