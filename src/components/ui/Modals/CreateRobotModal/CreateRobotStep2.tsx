import React, { memo } from "react";
import styles from "../index.module.css";
import {
    SubscribeModalContent,
    SubscribeModalContentProps
} from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { Button } from "components/basic";

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
    minAmounts,
    handleOnCreate,
    volumeTypeOptions
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <SubscribeModalContent
                    minAmounts={minAmounts}
                    volumeTypeOptions={volumeTypeOptions}
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
                        isLoading={!enabled}
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
