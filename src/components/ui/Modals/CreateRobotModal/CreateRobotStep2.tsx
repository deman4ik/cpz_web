import React, { memo } from "react";
import styles from "../index.module.css";
import {
    SubscribeModalContent,
    SubscribeModalContentProps
} from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { Button } from "components/basic";

const PLEASE_ENTER_DESIRED_TRADING_AMOUNT = "Please enter desired trading amount";

interface CreateRobotStep2Props extends SubscribeModalContentProps {
    handleOnBack: () => void;
    handleOnCreate: () => void;
    isValid: boolean;
}
const _CreateRobotStep2: React.FC<CreateRobotStep2Props> = ({
    robotData,
    formError,
    inputValues,
    setInputValues,
    validate,
    setVolumeType,
    volumeType,
    parsedLimits,
    onKeyPress,
    enabled,
    inputs,
    handleOnBack,
    isValid,
    handleOnCreate
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <SubscribeModalContent
                    robotData={robotData}
                    formError={formError}
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    validate={validate}
                    inputs={inputs}
                    setVolumeType={setVolumeType}
                    volumeType={volumeType}
                    parsedLimits={parsedLimits}
                    onKeyPress={onKeyPress}
                    enabled={enabled}
                />
                <div className={styles.btns}>
                    <Button
                        className={styles.btn}
                        title="Back"
                        icon="chevronleft"
                        type="dimmed"
                        isUppercase
                        onClick={handleOnBack}
                    />
                    <Button
                        className={styles.btn}
                        title="Next"
                        icon="chevronright"
                        type="success"
                        disabled={!isValid}
                        isUppercase
                        onClick={handleOnCreate}
                    />
                </div>
            </div>
        </div>
    );
};

export const CreateRobotStep2 = memo(_CreateRobotStep2);
