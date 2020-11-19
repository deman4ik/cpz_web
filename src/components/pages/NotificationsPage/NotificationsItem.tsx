import React, { memo } from "react";
import Link from "next/link";
import { formatDate, getTimeFromNow } from "config/utils";
import { showMessage, getRedirectionLink } from "./helpers";
import styles from "./NotificationsItem.module.css";

interface Props {
    item: any;
    routeNotification: (action: { link: string; redirect: boolean }) => void;
}

export const _NotificationsItem: React.FC<Props> = ({ item, routeNotification }) => {
    const handleOnPressNotification = () => {
        routeNotification(getRedirectionLink(item));
    };

    return (
        <div className={styles.tableRow}>
            <div className={styles.lineGroup}>
                <div className={styles.dateGroup}>
                    <div className={styles.dateText} title={formatDate(item.timestamp)}>
                        {getTimeFromNow(item.timestamp)}
                    </div>
                    {!item.readed ? <div className={styles.mark}>&nbsp;*</div> : null}
                </div>
                {showMessage(item, handleOnPressNotification)}
                {item?.type === "message.support-reply" && (
                    <Link href="/support">
                        <a className={styles.support_link} href="/support">
                            Reply
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export const NotificationsItem = memo(_NotificationsItem);
