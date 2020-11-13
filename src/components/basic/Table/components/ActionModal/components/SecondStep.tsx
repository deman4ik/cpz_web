import React, { useState } from "react";

import { EffectButton } from "components/basic/EffectButton";
import { Select } from "components/basic/Select";
import { Input } from "components/basic/Input";
import styles from "../index.module.css";
import { InputType } from "components/pages/ManagePage/utils";

const SecondStep = ({ selectedColumn, handlePressBack }) => {
    const inputType = selectedColumn.mutationInputType;
    const inputOptions = selectedColumn.mutationInputOptions;
    const callMode = selectedColumn.mutationCallMode;

    const inputIsSelect = inputType === InputType.select;

    const [inputValue, setInput] = useState(inputIsSelect ? inputOptions[0] : "");

    return (
        <div className={`${styles.container} ${styles.secondStepContainer}`}>
            <span className={styles.backButtonWrapper}>
                <EffectButton icon="arrowleft" onClick={handlePressBack} />
            </span>
            <div>
                {inputIsSelect ? (
                    <Select data={inputOptions} value={inputValue} onChangeValue={setInput} />
                ) : (
                    <Input value={inputValue} onChangeText={setInput} type={inputType} />
                )}
            </div>
        </div>
    );
};

export default SecondStep;
