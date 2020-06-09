import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
//styles
import styles from "./styles/Common.module.css";


const SupportPage: React.FC<any> = () => {
    const { width } = useWindowDimensions();
    return (
        <Template title="Support" subTitle="Support page" width={width}>
            <div>
              Support page
            </div>
        </Template>
    );
};

export default SupportPage;
