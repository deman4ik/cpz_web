import React, { memo } from "react";

import { Button } from "components/basic";
import { ErrorLine } from "components/common";
import { AlertIcon } from "assets/icons/svg";
import { color } from "config/constants";
import styles from "../index.module.css";

interface Props {
    enabled: boolean;
    robotName: string;
    handleOnStart?: () => void;
    onClose?: (changesMade?: boolean) => void;
    formError: string;
}

const _CreateRobotStep3: React.FC<Props> = ({ robotName, handleOnStart, onClose, enabled, formError }) => (
    <>
        <div className={styles.step3}>
            <i className={styles.iconWrapper}>
                <AlertIcon size={48} color={color.white} />
            </i>
            <div className={styles.bodyTitle}>Are you sure you want to start {robotName} robot now?</div>
            <div className={styles.bodyText}>
                It is a realtime automated trading mode using your exchange account and you use it at your own risk!
            </div>
            <ErrorLine formError={formError} style={{ margin: "20px 0 -50px" }} />
        </div>
        <div className={styles.btns}>
            <Button
                isLoading={!enabled}
                className={styles.btn}
                title="Yes"
                icon="check"
                type="success"
                isUppercase
                onClick={handleOnStart}
            />
            <Button
                className={styles.btn}
                title="No"
                icon="close"
                type="primary"
                isUppercase
                onClick={() => onClose(true)}
            />
        </div>
    </>
);

export const CreateRobotStep3 = memo(_CreateRobotStep3);
