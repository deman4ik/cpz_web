import React, { useMemo, useState, useContext } from "react";
import Router, { useRouter } from "next/router";

import { useQuery, useMutation } from "@apollo/client";

// components
import { NoRecentData, LoadingIndicator } from "components/common";
import { DefaultTemplate } from "components/layout";
import { HeaderRobotsRobotPage } from "./HeaderRobotsRobotPage";
import { TabsHeaderRobotPage } from "./HeaderRobotsRobotPage/TabsHeaderRobotPage";
import { Tabs } from "./Tabs";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals";
import { formatRobotData } from "./helpers";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// graphql
import { ROBOT_INFO_FOR_USER_ROBOTS, ROBOT_INFO_FOR_ROBOTS } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
// constants
import { PageType, TabType } from "config/types";
import { POLL_INTERVAL } from "config/constants";
// context
import { AuthContext } from "libs/hoc/context";

export const RobotsRobotPage: React.FC = () => {
    /*Определение контекста для страницы робота*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);
    const robotInfoQuery = isAuth ? ROBOT_INFO_FOR_USER_ROBOTS : ROBOT_INFO_FOR_ROBOTS;
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>(TabType.trading);
    const [visibleModal, setVisibleModal] = useState({ isVisible: false, type: "" });
    const router = useRouter();
    const vars = isAuth ? { code: router.query.code, user_id } : { code: router.query.code };
    const handlePressBack = () => {
        router.back();
    };
    const { data, loading } = useQuery(robotInfoQuery, {
        variables: vars,
        pollInterval: POLL_INTERVAL
    });

    const robotData = useMemo(() => (!loading && data?.robot.length ? formatRobotData(data?.robot[0]) : null), [
        data?.robot,
        data?.robot?.length,
        loading
    ]);

    const [setRobotData] = useMutation(SET_ROBOT_DATA, {
        onCompleted: (resolve) => {
            setVisibleModal({ isVisible: true, type: resolve.setRobot });
        }
    });

    const robotSubscribe = (variables) => {
        if (!isAuth) {
            Router.push("/auth/login");
        } else {
            setRobotData(variables);
        }
    };

    return (
        <DefaultTemplate
            page={PageType.robots}
            title="Trading Robot"
            subTitle={robotData ? robotData.robot.name : ""}
            width={width}
            toolbar={robotData ? <Toolbar robotSubscribe={robotSubscribe} robotData={robotData} /> : null}
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
                        isUserRobots={robotData.robot.belongsToUser}
                    />
                    <Tabs robotData={robotData} activeTab={activeTab} width={width} />
                    <Modals
                        visibleModal={visibleModal}
                        setVisibleModal={setVisibleModal}
                        code={router.query.code as string}
                        width={width}
                    />
                </>
            )}
        </DefaultTemplate>
    );
};
