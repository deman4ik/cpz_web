import React, { useMemo, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { NoRecentData, LoadingIndicator } from "components/common";
import { DefaultTemplate } from "components/layout";
import { PageHeader } from "./Header";
import RobotPageContent from "components/pages/common/RobotPageContent";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals";
import { formatRobotData } from "./helpers";
import useWindowDimensions from "hooks/useWindowDimensions";
import { USER_ROBOT_INFO_FOR_USER, ROBOT_INFO_FOR_ROBOTS } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
import { PageType, RobotsType } from "config/types";
import { POLL_INTERVAL } from "config/constants";
import { AuthContext } from "providers/authContext";

export const TradingRobotPage: React.FC = () => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });
    const router = useRouter();

    const robotInfoQuery = isAuth ? USER_ROBOT_INFO_FOR_USER : ROBOT_INFO_FOR_ROBOTS;
    const queryVars = isAuth ? { code: router.query.code, user_id } : { code: router.query.code };

    const { data: robotInfoData, loading, refetch } = useQuery(robotInfoQuery, {
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
            toolbar={robotData ? <Toolbar subscribe={subscribe} robotData={robotData} /> : null}
            handleBackNavigation>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !robotData ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <>
                    <PageHeader robotData={robotData} subscribe={subscribe} />
                    <RobotPageContent type={RobotsType.robots} robotData={robotData} width={width} />
                    <Modals
                        afterClose={refetch}
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
