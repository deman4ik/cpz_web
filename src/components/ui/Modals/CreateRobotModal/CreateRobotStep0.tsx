/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo, useEffect } from "react";

import { exchangeName } from "config/utils";
import { Button, Select } from "components/basic";
import { ExchangeKeysAddKeyModal } from "components/pages/ProfilePage/ExchangeKeys/ExchangeKeysAddKeyModal";
import styles from "../index.module.css";
import { GET_USER_EXCHANGES_WITH_MARKETS } from "graphql/profile/queries";
import { LoadingIndicator } from "components/common";

interface Props {
    dataPicker: any; // Todo any
    selectedKey: string;
    enabled: boolean;
    variables: any; // Todo any
    hasError?: boolean;
    handleOnNext: () => void;
    handleOnChangeExchange: (value: string) => void;
    setFormError: (error: string) => void;
    onClose: (changesMade?: boolean) => void;
}

const _CreateRobotStep0: React.FC<Props> = ({
    selectedKey,
    hasError,
    dataPicker,
    variables,
    handleOnNext,
    handleOnChangeExchange,
    setFormError,
    enabled,
    onClose
}) => {
    const [newName, setNewName] = useState("");
    const [isAddKeyVisible, setIsAddKeyVisible] = useState(!dataPicker.length);
    const { exchange } = variables;
    const refetchQueries = [
        {
            query: GET_USER_EXCHANGES_WITH_MARKETS,
            variables
        }
    ];

    const handleOnAddKey = () => {
        if (isAddKeyVisible) {
            handleOnChangeExchange(selectedKey);
        } else {
            setFormError("");
        }

        setIsAddKeyVisible(!isAddKeyVisible);
    };

    const handleOnSubmit = (name: string) => {
        setIsAddKeyVisible(false);
        setNewName(name);
    };

    useEffect(() => {
        if (newName) {
            handleOnChangeExchange(dataPicker.find((item) => item.label === newName).id);
            setNewName("");
        }
    }, []);

    useEffect(() => {
        setIsAddKeyVisible(!dataPicker.length);
    }, [dataPicker]);

    const subsTariff = dataPicker.map((item) => item.options);

    console.table(subsTariff[0]);

    return (
        <>
            {enabled &&
                subsTariff.map((tariff, index) => (
                    <div key={index} style={{ display: "flex", color: "white" }}>
                        {" "}
                        {Object.entries(tariff).map(([key, value], index) => (
                            <div key={index}>
                                <h3>{key}</h3>
                                <p>Unit: {value.unit}</p>
                                <p>Price: {value.price}</p>
                                <p>Amount: {value.amount}</p>
                                <p>Discount: {value.discount}</p>
                            </div>
                        ))}{" "}
                    </div>
                ))}
            {!enabled && <LoadingIndicator />}
        </>
    );
};

export const CreateRobotStep0 = memo(_CreateRobotStep0);
