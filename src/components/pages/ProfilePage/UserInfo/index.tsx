import React, { memo, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";

import { GET_USER_INFO } from "graphql/user/queries";
// components
import { Button, Modal } from "components/basic";
import { InputLike } from "components/ui/InputLike";
import { LoadingIndicator } from "components/common";
import { NameModal } from "./NameModal";
import { EmailModal } from "./EmailModal";
import { PasswordModal } from "./PasswordModal";
import NothingComponent from "components/common/NothingComponent";
// styles
import styles from "./index.module.css";
import styles_ext from "../AccountBalance.module.css";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    width: number;
}

const TelegramLoginWithNoSSR = dynamic(() => import("components/ui/TelegramLogin"), { ssr: false });

const _UserInfo: React.FC<Props> = ({ width }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(GET_USER_INFO, {
        variables: { user_id }
    });
    const [title, setTitle] = useState("");
    const [isNameModalVisible, setNameModalVisible] = useState(false);
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

    const handleOnClosePasswordModal = () => {
        setPasswordModalVisible(!isPasswordModalVisible);
    };

    const handleOnCloseNameModal = () => {
        setNameModalVisible(!isNameModalVisible);
    };

    const handleOnCloseEmailModal = () => {
        setEmailModalVisible(!isEmailModalVisible);
    };

    return (
        <>
            <div className={styles_ext.regionTitle}>User Info</div>
            <div className={styles_ext.surface}>
                {loading ? (
                    <LoadingIndicator />
                ) : !data ? (
                    <NothingComponent beforeButtonKeyWord="user info" />
                ) : (
                    <div className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles.formRow}>
                                <div className={styles.label}>Username</div>
                                <div className={styles.inputContainer}>
                                    <InputLike
                                        value={data.users[0].name || ""}
                                        onClickButton={handleOnCloseNameModal}
                                        icon="account"
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.label}>Email</div>
                                <div className={styles.inputContainer}>
                                    <InputLike
                                        value={data.users[0].email || ""}
                                        onClickButton={handleOnCloseEmailModal}
                                        icon="email"
                                    />
                                </div>
                            </div>
                            {data.users[0].email && (
                                <div className={styles.formRow}>
                                    <div className={styles.label}>Password</div>
                                    <div className={styles.inputContainer}>
                                        <Button
                                            title="Change"
                                            type="dimmed"
                                            onClick={handleOnClosePasswordModal}
                                            icon="lockopen"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={styles.formRow} style={{ marginBottom: 0 }}>
                                <div className={styles.label}>Telegram</div>
                                {data.users[0].telegram_id ? (
                                    <div className={styles.inputContainer}>
                                        <div className={styles.telegramName}>
                                            {data.users[0].telegram_username || data.users[0].telegram_id}
                                        </div>
                                    </div>
                                ) : (
                                    <TelegramLoginWithNoSSR userId={data.users[0].id} />
                                )}
                            </div>
                            <Modal isOpen={isNameModalVisible} title="Change Name" onClose={handleOnCloseNameModal}>
                                <NameModal name={data.users[0].name || ""} onClose={handleOnCloseNameModal} />
                            </Modal>
                            <Modal isOpen={isEmailModalVisible} title={title} onClose={handleOnCloseEmailModal}>
                                <EmailModal
                                    width={width}
                                    email={data.users[0].email || ""}
                                    onClose={handleOnCloseEmailModal}
                                    setTitle={setTitle}
                                />
                            </Modal>
                            <Modal
                                isOpen={isPasswordModalVisible}
                                title="Change Password"
                                onClose={handleOnClosePasswordModal}>
                                <PasswordModal onClose={handleOnClosePasswordModal} />
                            </Modal>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export const UserInfo = memo(_UserInfo);
