import React, { useContext } from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
// auth context
import { AuthContext } from "libs/hoc/authContext";

const MangeDashboard: React.FC<any> = () => {
    const {
        authState: { user_id, isManager }
    } = useContext(AuthContext);

    console.log(isManager);

    const { width } = useWindowDimensions();
    return (
        <Template title="Dasboard" subTitle="Users dashboard" width={width}>
            <div>manage dasboard</div>
        </Template>
    );
};

export default MangeDashboard;
