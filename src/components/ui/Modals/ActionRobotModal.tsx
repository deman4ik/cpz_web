import React, { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { USER_ROBOT_DELETE, USER_ROBOT_START, USER_ROBOT_STOP } from "graphql/robots/mutations";
import { capitalize } from "config/utils";
import { ErrorLine } from "components/common";
import { Button } from "components/basic";
import { actionText, currentPage, Pages } from "./helpers";
import { event } from "libs/gtag";
import styles from "./index.module.css";
import Router from "next/router";
import { RobotsType } from "config/types";

interface Props {
    setTitle: (title: string) => void;
    type: string;
    onClose: (changesMade?: boolean) => void;
}

const actionTypes = {
    delete: USER_ROBOT_DELETE,
    start: USER_ROBOT_START,
    stop: USER_ROBOT_STOP
};
const actions = {
    delete: "userRobotDelete",
    start: "userRobotStart",
    stop: "userRobotStop"
};
const _ActionRobotModal: React.FC<Props> = ({ onClose, type, setTitle }) => {
    const [formError, setFormError] = useState("");
    const { data } = useQuery(ROBOT(RobotsType.robots));

    const { name, code, userRobotId } = data?.robot;
    useEffect(() => {
        setTitle(`${capitalize(type)} ${name || null}`);
    }, [name, setTitle, type]);

    const robotAction = actionTypes[type];
    const [userRobotAction, { loading }] = useMutation(robotAction);

    const variables = {
        id: userRobotId
    };

    function handleResponse(response: any) {
        const { result } = response.data[actions[type]];
        if (result) {
            if (type === "start") {
                event({
                    action: "start",
                    category: "Robots",
                    label: "start",
                    value: userRobotId
                });
            }
            onClose(true);
        } else {
            setFormError(response.data[actions[type]].error);
        }
    }
    const handleOnPressSubmit = async () => {
        try {
            const userRobotActionResponse = await userRobotAction({ variables });
            handleResponse(userRobotActionResponse);
            if (type === "start") {
                event({
                    action: "start",
                    category: "Robots",
                    label: "start",
                    value: userRobotId
                });
            }
            if (type === "delete" && currentPage(Router.pathname) === Pages.robot) {
                Router.push(`/robots`);
            }
            onClose(true);
        } catch (e) {
            console.error(e);
            setFormError(e.message);
        }
    };

    return (
        <>
            <ErrorLine formError={formError} />
            <div className={styles.container}>
                <div className={styles.textWrapper}>
                    <div className={styles.bodyTitle}>
                        Are you sure you want to {type} this {name || ""} robot?
                    </div>
                    <div className={styles.bodyText}>{actionText[type]}</div>
                </div>
                <div className={styles.btns}>
                    <Button
                        className={styles.btn}
                        title="Yes"
                        icon="check"
                        width={70.61}
                        type="success"
                        isLoading={loading}
                        onClick={handleOnPressSubmit}
                    />
                    <Button className={styles.btn} title="No" icon="close" type="primary" onClick={onClose} />
                </div>
            </div>
        </>
    );
};

export const ActionRobotModal = memo(_ActionRobotModal);
