/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo, useContext } from "react";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

// components
import { DefaultTemplate } from "components/layout";
import { HeaderRobotsRobotPage } from "./Header";
import { TabsHeaderRobotPage } from "./Header/TabsHeaderRobotPage";
import { PageTabs } from "./PageTabs";
import { NoRecentData, LoadingIndicator } from "components/common";
import { ToolbarRobotPage } from "./ToolbarRobotPage";
import { ModalsRobotPage } from "./ModalsRobotPage";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// types
import { PageType, TabType } from "config/types";
// graphql
import { ROBOT_INFO_FOR_USER, ROBOT_INFO } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
// constants
import { POLL_INTERVAL } from "config/constants";
// helpers
import { formatRobotData } from "./helpers";
// context
import { AuthContext } from "libs/hoc/context";

export const SignalRobotPage = () => {
    /*Определение контекста для страницы робота*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const robotsInfoQuery = isAuth ? ROBOT_INFO_FOR_USER : ROBOT_INFO;
    const userId = isAuth ? { user_id } : null;
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>(TabType.trading);
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });

    const router = useRouter();
    const handlePressBack = () => {
        router.back();
    };

    const { data, loading } = useQuery(robotsInfoQuery, {
        variables: {
            code: router.query.code,
            ...userId
        },
        pollInterval: POLL_INTERVAL
    });

    const [setRobotData] = useMutation(SET_ROBOT_DATA, {
        onCompleted: (resolve) => {
            setModalVisibility({ isVisible: true, type: resolve.setRobot });
        }
    });

    const robotData = useMemo(() => (!loading && data && data.robot.length ? formatRobotData(data) : null), [
        data,
        loading
    ]);

    const robotSubscribe = (variables) => {
        if (!isAuth) {
            Router.push("/auth/login");
        } else {
            setRobotData(variables);
        }
    };

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals"
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
                        isUserSignals={robotData.robot.isUserSignals}
                    />
                    <PageTabs robotData={robotData} activeTab={activeTab} width={width} />
                    <ModalsRobotPage isModalVisible={isModalVisible} setModalVisibility={setModalVisibility} />
                </>
            )}
        </DefaultTemplate>
    );
};
