import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import Main from "./components/main";
import SupportChat from "./components/supportChat";
//styles
import styles from "./styles/Common.module.css";
// types
import { PageType } from "config/types";

const SupportPage: React.FC<any> = () => {
    const { width } = useWindowDimensions();
    return (
        <Template title="Support" page={PageType.support} subTitle="Support page" width={width}>
            <div className={styles.content_wrapper}>
                <Main />
                <SupportChat />
            </div>
        </Template>
    );
};

export default SupportPage;
