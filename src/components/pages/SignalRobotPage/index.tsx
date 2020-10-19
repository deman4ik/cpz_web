/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo, useContext } from "react";
import Router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

// components
import { DefaultTemplate } from "components/layout";
import { Header } from "./Header";
import { PageTabs } from "./PageTabs";
import { NoRecentData, LoadingIndicator } from "components/common";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals";
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
import { AuthContext, HistoryContext } from "libs/hoc/context";

export const SignalRobotPage = () => {
    /*Определение контекста для страницы робота*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { historyState } = useContext(HistoryContext);
    const { prevRoute } = historyState;
    const robotsInfoQuery = isAuth ? ROBOT_INFO_FOR_USER : ROBOT_INFO;
    const userId = isAuth ? { user_id } : null;
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>(TabType.trading);
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });
    const router = useRouter();

    const handlePressBack = () => {
        router.push(prevRoute);
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

    const robotData = useMemo(() => (!loading && data && data.robot.length ? formatRobotData(data.robot[0]) : null), [
        data,
        loading
    ]);

    const subscribe = (variables) => {
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
            toolbar={robotData ? <Toolbar subscribe={subscribe} robotData={robotData} /> : null}
            handlePressBack={prevRoute ? handlePressBack : null}>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !robotData ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <>
                    <Header
                        subscribe={subscribe}
                        robotData={robotData}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isUserSubscribed={robotData.robot.isUserSubscribed}
                    />
                    <PageTabs robotData={robotData} activeTab={activeTab} width={width} />
                    <Modals isModalVisible={isModalVisible} setModalVisibility={setModalVisibility} />
                </>
            )}
        </DefaultTemplate>
    );
};
