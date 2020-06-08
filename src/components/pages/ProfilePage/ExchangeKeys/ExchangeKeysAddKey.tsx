import React, { memo, useContext } from "react";
import Router from "next/router";
// components
import { CaptionButton } from "components/basic";
// types
import { ModalKey } from "./types";
// context
import { AuthContext } from "libs/hoc/authContext";
// styles
import styles from "./ExchangeKeysAddKey.module.css";

interface Props {
    handleSetVisibleModal: (key: ModalKey) => void;
}

const _ExchangeKeysAddKey: React.FC<Props> = ({ handleSetVisibleModal }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const handleOnPress = () => {
        if (!isAuth) {
            // редирект если пользователь не аутентифицирован
            Router.push("/auth/login");
        } else {
            handleSetVisibleModal(ModalKey.addKey);
        }
    };

    return (
        <div className={styles.itemContainerCard}>
            <div className={styles.border} onClick={handleOnPress}>
                <CaptionButton title="Add New Key" responsive={false} icon="plus" />
            </div>
        </div>
    );
};

export const ExchangeKeysAddKey = memo(_ExchangeKeysAddKey);
