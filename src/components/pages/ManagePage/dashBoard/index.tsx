import React, { useContext } from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import { Card } from "components/basic";
import TotalStats from "./TotalStats";
// auth context
import { AuthContext } from "libs/hoc/authContext";
// styles
import styles from "./styles/Common.module.css";

const MangeDashboard: React.FC<any> = () => {
    const {
        authState: { user_id, isManager }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    return (
        <Template title="Dasboard" subTitle="Users dashboard" width={width}>
            <Card style={{ minHeight: "305px", margin: "15px" }}>
                <TotalStats />
            </Card>
        </Template>
    );
};

export default MangeDashboard;
