import React, { useContext } from "react";
import StepCard from "../../../SupportPage/components/main/StepCard";
import styles from "./styles/Common.module.css";
import stylesMain from "./styles/Main.module.css";
import { SIGNALS_CARDS, ROBOTS_CARDS, CREATE_ACCOUNT_CARD } from "./constants";
import { AuthContext } from "libs/hoc/context";
import { RobotsType } from "config/types";

const renderStepsCards = (cardsArray) => cardsArray.map((item, index) => <StepCard {...item} key={index} />);

interface Props {
    type: RobotsType;
}

const RobotsGuide: React.FC<Props> = ({ type }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            {type === RobotsType.signals ? (
                <div className={stylesMain.steps_section}>
                    <div className={styles.section_title}>Signals first steps</div>
                    {!isAuth && <StepCard {...CREATE_ACCOUNT_CARD} />}
                    {renderStepsCards(SIGNALS_CARDS)}
                </div>
            ) : (
                <div className={stylesMain.steps_section}>
                    <div className={styles.section_title}>Robots first steps</div>
                    {!isAuth && <StepCard {...CREATE_ACCOUNT_CARD} />}
                    {renderStepsCards(ROBOTS_CARDS)}
                </div>
            )}
        </div>
    );
};

export default RobotsGuide;
