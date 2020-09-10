import React, { useContext } from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { DefaultTemplate } from "components/layout";
import Main from "./components/main";
import SupportChat from "./components/SupportChat";
//styles
import styles from "./styles/Common.module.css";
// types
import { PageType } from "config/types";
// auth context
import { AuthContext } from "libs/hoc/authContext";

const SupportPage: React.FC<any> = () => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    return (
        <DefaultTemplate title="Support" page={PageType.support} subTitle="Support page" width={width}>
            <div className={styles.content_wrapper}>
                <Main />
                {isAuth && <SupportChat user_id={user_id} />}
            </div>
        </DefaultTemplate>
    );
};

export default SupportPage;
