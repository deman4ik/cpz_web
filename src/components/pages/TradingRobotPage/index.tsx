import React, { useMemo, useState, useContext } from "react";
import Router, { useRouter } from "next/router";

import { useQuery, useMutation } from "@apollo/client";

// components
import { NoRecentData, LoadingIndicator } from "components/common";
import { DefaultTemplate } from "components/layout";
import { PageHeader } from "./Header";
import { PageTabs } from "./PageTabs";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals";
import { formatRobotData } from "./helpers";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// graphql
import { USER_ROBOT_INFO_FOR_USER, ROBOT_INFO_FOR_ROBOTS } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
// constants
import { PageType, TabType } from "config/types";
import { POLL_INTERVAL } from "config/constants";
// context
import { AuthContext, HistoryContext } from "libs/hoc/context";

export const TradingRobotPage: React.FC = () => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { historyState } = useContext(HistoryContext);
    const { prevRoute } = historyState;
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState<TabType>(TabType.trading);
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });
    const router = useRouter();

    const robotInfoQuery = isAuth ? USER_ROBOT_INFO_FOR_USER : ROBOT_INFO_FOR_ROBOTS;
    const queryVars = isAuth ? { code: router.query.code, user_id } : { code: router.query.code };

    const handlePressBack = () => {
        router.push(prevRoute);
    };

    const { data: robotInfoData, loading } = useQuery(robotInfoQuery, {
        variables: queryVars,
        pollInterval: POLL_INTERVAL
    });

    const robotData = useMemo(
        () => (!loading && robotInfoData?.robot.length ? formatRobotData(robotInfoData?.robot[0]) : null),
        [robotInfoData?.robot, loading]
    );

    const [setRobotData] = useMutation(SET_ROBOT_DATA, {
        onCompleted: (resolve) => {
            setModalVisibility({ isVisible: true, type: resolve.setRobot });
        }
    });

    const subscribe = (variables) => {
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
            subTitle={robotData?.robot.name || ""}
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
                    <PageHeader
                        robotData={robotData}
                        subscribe={subscribe}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <PageTabs robotData={robotData} activeTab={activeTab} width={width} />
                    <Modals
                        isModalVisible={isModalVisible}
                        setModalVisibility={setModalVisibility}
                        code={router.query.code as string}
                        width={width}
                    />
                </>
            )}
        </DefaultTemplate>
    );
};
