import React, { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ROBOT } from "graphql/local/queries";
import { USER_ROBOT_DELETE, USER_ROBOT_START, USER_ROBOT_STOP } from "graphql/robots/mutations";
import { DELETE_ROBOT, ACTION_ROBOT } from "graphql/local/mutations";
import { capitalize } from "config/utils";
import { ErrorLine } from "components/common";
import { Button } from "components/basic";
import { actionText } from "./helpers";
import { event } from "libs/gtag";
import styles from "./index.module.css";

interface Props {
    setTitle: (title: string) => void;
    type: string;
    onClose: () => void;
}

const _ActionRobotModal: React.FC<Props> = ({ onClose, type, setTitle }) => {
    const [formError, setFormError] = useState("");
    const { data } = useQuery(ROBOT);

    useEffect(() => {
        setTitle(`${capitalize(type)} ${data ? data.robot.name : null}`);
    }, [data, setTitle, type]);
    const [actionOnRobot] = useMutation(type === "delete" ? DELETE_ROBOT : ACTION_ROBOT);
    const [userRobotAction, { loading }] = useMutation(
        type === "delete" ? USER_ROBOT_DELETE : type === "start" ? USER_ROBOT_START : USER_ROBOT_STOP
    );

    const handleOnPressSubmit = () => {
        const message = type === "start" ? "started" : "stopped";
        const variables = {
            id: data.robot.userRobotId
        };
        const variablesLocal = {
            robot: data.robot,
            message
        };
        const action = {
            delete: "userRobotDelete",
            start: "userRobotStart",
            stop: "userRobotStop"
        };
        userRobotAction({
            variables
        }).then((response) => {
            const result = response.data[action[type]].success;
            if (result) {
                if (type !== "delete") {
                    variablesLocal.message = response.data[action[type]].status;
                }
                actionOnRobot({ variables: variablesLocal });
                if (type === "start") {
                    event({
                        action: "start",
                        category: "Robots",
                        label: "start",
                        value: data.robot.userRobotId
                    });
                }
                onClose();
            } else {
                setFormError(response.data[action[type]].error);
            }
        });
    };

    return (
        <>
            <ErrorLine formError={formError} />
            <div className={styles.container}>
                <div className={styles.textWrapper}>
                    <div className={styles.bodyTitle}>
                        Are you sure you want to {type} this {data ? data.robot.name : ""} robot?
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
