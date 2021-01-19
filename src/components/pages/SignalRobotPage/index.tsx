import React, { useState, useMemo, useContext, memo } from "react";
import Router, { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { DefaultTemplate } from "components/layout";
import { Header } from "./Header";
import RobotPageContent from "../common/RobotPageContent";
import { NoRecentData, LoadingIndicator } from "components/common";
import { Toolbar } from "./Toolbar";
import { Modals } from "./Modals/index";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType, RobotsType } from "config/types";
import { ROBOT_INFO_FOR_USER, ROBOT_INFO } from "graphql/robots/queries";
import { SET_MODAL_STATE } from "graphql/local/mutations";
import { POLL_INTERVAL } from "config/constants";
import { formatRobotData } from "./helpers";
import { AuthContext } from "providers/authContext";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { MODAL_VISIBLE } from "graphql/local/queries";

const SignalRobotPage = (): JSX.Element => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const [availableWidth, setAvailableWidth] = useState(0);

    const router = useRouter();
    const robotsInfoQuery = isAuth ? ROBOT_INFO_FOR_USER : ROBOT_INFO;
    const userId = isAuth ? { user_id } : null;
    const [isModalVisible, setModalVisibility] = useState({ isVisible: false, type: "" });

    const { loading, data, refetch } = useQueryWithAuth(false, robotsInfoQuery, {
        variables: {
            code: router.query.code,
            ...userId
        },
        pollInterval: POLL_INTERVAL,
        ssr: false
    });

    const [setSubscride] = useMutation(SET_MODAL_STATE, {
        refetchQueries: [{ query: MODAL_VISIBLE }]
    });

    const robotData = useMemo(() => (!loading && data && data.robot.length ? formatRobotData(data.robot[0]) : null), [
        data,
        loading
    ]);

    const subscribe = async ({ variables }) => {
        if (!isAuth) {
            Router.push("/auth/login");
        } else {
            await setSubscride({ variables });
            setModalVisibility({ isVisible: true, type: variables.type });
        }
    };

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals"
            subTitle={robotData ? robotData.robot.name : ""}
            toolbar={robotData ? <Toolbar subscribe={subscribe} robotData={robotData} /> : null}
            handleBackNavigation>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !robotData ? (
                <NoRecentData message="No recent data available" />
            ) : (
                <div
                    style={{ width: "100%" }}
                    ref={(el) => {
                        if (!el) return;
                        setAvailableWidth(el.getBoundingClientRect().width - 20);
                    }}>
                    <Header subscribe={subscribe} robotData={robotData} width={availableWidth} />
                    <RobotPageContent type={RobotsType.signals} robotData={robotData} width={availableWidth} />
                    <Modals
                        isModalVisible={isModalVisible}
                        setModalVisibility={setModalVisibility}
                        afterClose={refetch}
                    />
                </div>
            )}
        </DefaultTemplate>
    );
};

export default memo(SignalRobotPage);
