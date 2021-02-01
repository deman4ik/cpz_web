import React, { useContext } from "react";
// components
import StepCard from "./StepCard";
// styles
import styles from "../../styles/Common.module.css";
import stylesMain from "../../styles/Main.module.css";
// constants
import { TG_CARD, AUTH_HELP_CARD, LEARN_ROBOTS_CARD } from "./constants";
// auth context
import { AuthContext } from "providers/authContext";

const Main: React.FC = () => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    return (
        <>
            <div className={stylesMain.contact_support_container}>
                <StepCard {...LEARN_ROBOTS_CARD} />
                <div className={styles.section_title}>Contact support</div>
                <StepCard {...TG_CARD} />
                {!isAuth && <StepCard {...AUTH_HELP_CARD} />}
            </div>
        </>
    );
};

export default Main;
