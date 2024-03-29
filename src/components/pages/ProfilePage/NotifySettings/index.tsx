import React, { memo, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_USER_INFO } from "graphql/user/queries";
import { SET_NOTIFICATION_SETTINGS } from "graphql/user/mutations";
import { LoadingIndicator } from "components/common";
import { capitalize } from "config/utils";
import { extraSettings, serviceName } from "./helpers";
import { NotificationProps } from "./types";
import { Notify } from "./Notify";
import styles from "./index.module.css";
// context
import { AuthContext } from "providers/authContext";

const _NotifySettings: React.FC = () => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const { loading } = useQuery(GET_USER_INFO, {
        onCompleted: (data) => {
            const { notifications: _notifications } = data.users[0].settings;
            setNotifications(
                Object.keys(_notifications).map((key) => ({
                    key,
                    checkboxes: Object.keys(_notifications[key]).map((name) => ({
                        name,
                        isActive: _notifications[key][name],
                        disabled: !data.users[0][serviceName[name]],
                        isLoading: false
                    })),
                    ...extraSettings[key]
                }))
            );
        },
        variables: { user_id }
    });
    const [saveNotifications] = useMutation(SET_NOTIFICATION_SETTINGS);

    const combinePropName = (key, name) => `${key}${capitalize(name)}`; // e.g signalsTelegram
    const toggleNotification = (key: string, name: string) => {
        const isActive = !notifications.find((el) => el.key === key).checkboxes.find((el) => el.name === name).isActive;
        setNotifications((prev) =>
            prev.map((item) => {
                if (item.key === key) {
                    const checkboxes = item.checkboxes.map((checkbox) => {
                        if (checkbox.name === name) {
                            return { ...checkbox, isLoading: true };
                        }
                        return checkbox;
                    });
                    return { ...item, checkboxes };
                }
                return item;
            })
        );
        saveNotifications({
            variables: {
                [combinePropName(key, name)]: isActive
            }
        })
            .then((response) => {
                setNotifications((prev) => {
                    return prev.map((item) => {
                        if (item.key === key) {
                            const checkboxes = item.checkboxes.map((checkbox) => {
                                if (checkbox.name === name) {
                                    return { ...checkbox, isLoading: false, isActive };
                                }
                                return checkbox;
                            });
                            return { ...item, checkboxes };
                        }
                        return item;
                    });
                });
            })
            .catch((e) => console.error(e));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.regionTitle}>Notification Settings</div>
                <div className={styles.surface}>
                    {loading ? (
                        <LoadingIndicator />
                    ) : (
                        <div className={styles.columns}>
                            {notifications.map((item, idx) => (
                                <Notify
                                    item={item}
                                    toggleNotification={toggleNotification}
                                    key={item.key}
                                    isLast={idx === notifications.length - 1}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export const NotifySettings = memo(_NotifySettings);
