import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import Main from "./components/main";
//styles
import styles from "./styles/Common.module.css";

const SupportPage: React.FC<any> = () => {
    const { width } = useWindowDimensions();
    return (
        <Template title="Support" subTitle="Support page" width={width}>
            <div className={styles.content_wrapper}>
                <Main />
            </div>
        </Template>
    );
};

export default SupportPage;
