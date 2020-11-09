import React, { useState, useMemo, useContext, memo } from "react";
import Router, { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { DefaultTemplate } from "components/layout";
import { Header } from "./Header";
import PageContent from "./PageContent";
import { NoRecentData, LoadingIndicator } from "components/common";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals/index";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType } from "config/types";
import { ROBOT_INFO_FOR_USER, ROBOT_INFO } from "graphql/robots/queries";
import { SET_ROBOT_DATA } from "graphql/local/mutations";
import { POLL_INTERVAL } from "config/constants";
import { formatRobotData } from "./helpers";
import { AuthContext } from "libs/hoc/context";
import { isNewPage } from "utils/common";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

const SignalRobotPage = (): JSX.Element => {
    /*Определение контекста для страницы робота*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    const router = useRouter();
    const [pageIsNew] = useState(isNewPage());
    const robotsInfoQuery = isAuth ? ROBOT_INFO_FOR_USER : ROBOT_INFO;
    const userId = isAuth ? { user_id } : null;
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });

    const handlePressBack = () => {
        router.back();
    };

    const { loading, data, refetch } = useQueryWithAuth(false, robotsInfoQuery, {
        variables: {
            code: router.query.code,
            ...userId
        },
        pollInterval: POLL_INTERVAL,
        ssr: false
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
            handlePressBack={pageIsNew ? null : handlePressBack}>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !robotData ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <>
                    <Header subscribe={subscribe} robotData={robotData} />
                    <PageContent robotData={robotData} width={width} />
                    <Modals
                        isModalVisible={isModalVisible}
                        setModalVisibility={setModalVisibility}
                        afterClose={refetch}
                    />
                </>
            )}
        </DefaultTemplate>
    );
};

export default memo(SignalRobotPage);
