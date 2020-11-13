import React, { useState, useEffect, useCallback } from "react";

import { EffectButton } from "components/basic/EffectButton";
import { Select } from "components/basic/Select";
import { Input } from "components/basic/Input";
import styles from "../index.module.css";
import { InputType } from "components/pages/ManagePage/utils";
import { useMutation } from "@apollo/client";
import { Button } from "components/basic/Button";

const SecondStep = ({ selectedColumn, handlePressBack, itemsIds, onSubmit }) => {
    const { mutation } = selectedColumn;
    const inputType = selectedColumn.mutationInputType;
    const inputOptions = selectedColumn.mutationInputOptions;
    const callMode = selectedColumn.mutationCallMode;

    const [error, setError] = useState("");
    const appendError = useCallback(
        (msg) => {
            if (error === "") setError("Following fields are expected to be declared in selected column:");
            setError(`${error.trim()} ${msg.trim()};`);
        },
        [error]
    );

    const inputIsSelect = inputType === InputType.select;

    const [inputValue, setInput] = useState(inputIsSelect ? inputOptions[0].value : "");

    const [mutate, { loading }] = useMutation(mutation);

    const callMutation = () => {
        mutate({
            variables: {
                [selectedColumn.id]: inputValue,
                ids: itemsIds
            }
        }).then(() => onSubmit());
    };

    useEffect(() => {
        if (typeof mutation === "undefined") {
            appendError("mutation");
        }
        if (inputType && inputType === InputType.select && typeof inputOptions === "undefined") {
            appendError("mutationInputOptions");
        }
        if (typeof callMode === "undefined") {
            appendError("mutationCallMode");
        }
        if (error !== "") throw new Error(error);
    }, [appendError, callMode, error, inputOptions, inputType, mutation]);

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
            <Button title="Apply" type="success" onClick={callMutation} isLoading={loading} />
        </div>
    );
};

export default SecondStep;
