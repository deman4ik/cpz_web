import React, { useMemo, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { NoRecentData, LoadingIndicator } from "components/common";
import { Template } from "components/layout";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType, TabType } from "config/types";
import { GET_ROBOT_INFO_USER_ROBOTS, GET_ROBOT_INFO_NOT_AUTH_ROBOTS } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
import { POLL_INTERVAL } from "config/constants";
import { HeaderRobotsRobotPage } from "./HeaderRobotsRobotPage";
import { TabsHeaderRobotPage } from "./HeaderRobotsRobotPage/TabsHeaderRobotPage";
import { TabsPagesRobotPage } from "./TabsPagesRobotPage";
import { ToolbarRobotPage } from "./ToolbarRobotPage";
import { ModalsRobotPage } from "./ModalsRobotPage";
import { formatRobotData } from "./helpers";
// context
import { AuthContext } from "libs/hoc/authContext";

export const RobotsRobotPage: React.FC = () => {
    /*Определение контекста для страницы робота*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);
    const robotInfoQuery = isAuth ? GET_ROBOT_INFO_USER_ROBOTS : GET_ROBOT_INFO_NOT_AUTH_ROBOTS;

    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>(TabType.trading);
    const [visibleModal, setVisibleModal] = useState({ isVisible: false, type: "" });
    const router = useRouter();
    const handlePressBack = () => {
        router.back();
    };
    const { data, loading } = useQuery(robotInfoQuery, {
        variables: { code: router.query.code },
        pollInterval: POLL_INTERVAL
    });
    const robotData = useMemo(() => (!loading && data && data.robot.length ? formatRobotData(data) : null), [
        data,
        loading
    ]);

    const [setRobotData] = useMutation(SET_ROBOT_DATA, {
        onCompleted: (resolve) => {
            setVisibleModal({ isVisible: true, type: resolve.setRobot });
        }
    });

    const robotSubscribe = (variables) => {
        setRobotData(variables);
    };

    return (
        <Template
            page={PageType.robots}
            title="Trading Robot"
            subTitle={robotData ? robotData.robot.name : ""}
            width={width}
            toolbar={robotData ? <ToolbarRobotPage robotSubscribe={robotSubscribe} robotData={robotData} /> : null}
            handlePressBack={handlePressBack}>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !robotData ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <>
                    <HeaderRobotsRobotPage robotSubscribe={robotSubscribe} robotData={robotData} />
                    <TabsHeaderRobotPage
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isUserRobots={robotData.robot.isUserRobot}
                    />
                    <TabsPagesRobotPage robotData={robotData} activeTab={activeTab} width={width} />
                    <ModalsRobotPage
                        visibleModal={visibleModal}
                        setVisibleModal={setVisibleModal}
                        code={router.query.code as string}
                        width={width}
                    />
                </>
            )}
        </Template>
    );
};
