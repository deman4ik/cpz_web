import React, { useContext } from "react";
// components
import { RedirectLoginButton } from "../RedirectLoginButton";
import { NoRecentData } from "../NoRecentData";
// constants
import { ICON_TYPES } from "./constants";
// styles
import styles from "./nothing.module.css";
// auth context
import { AuthContext } from "../../../providers/authContext";
// types
import { ButtonSize } from "components/basic/Button/types";

export interface NothingProps {
    noRecentMessage?: string;
    noRecentStyles?: React.CSSProperties;
    buttonStyles?: React.CSSProperties;
    buttonSize?: ButtonSize;
    beforeButtonKeyWord?: string;
    beforeButtonMessage?: string;
}

/**
 *  Компонент отображающий  месседж данных которые отстутвуют в зависимости от контекста аутентификации
 */
const NothingComponent: React.FC<NothingProps> = ({
    noRecentMessage,
    noRecentStyles,
    buttonStyles,
    buttonSize,
    beforeButtonKeyWord,
    beforeButtonMessage
}) => {
    /*Работа с контекстом*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    /*No recent message*/
    const messageNoRecent = noRecentMessage || "No recent data available";

    /*Определение компонента в зависимости от контекста*/
    const component = isAuth ? (
        <NoRecentData message={messageNoRecent} style={noRecentStyles} />
    ) : (
        <div>
            <div className={styles.nothing_description}>
                {ICON_TYPES[beforeButtonKeyWord] && (
                    <div className={styles.nothing_description_icon}>{ICON_TYPES[beforeButtonKeyWord]}</div>
                )}
                {beforeButtonKeyWord && `Your ${beforeButtonMessage || beforeButtonKeyWord} will appear here.`}
            </div>
            <RedirectLoginButton style={{ margin: "auto", ...buttonStyles }} size={buttonSize} />
        </div>
    );

    return component;
};

export default NothingComponent;
