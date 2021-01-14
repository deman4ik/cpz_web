import React from "react";
import Router from "next/router";

import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { NotificationsItem } from "./NotificationsItem";
import { NotificationsItemCard } from "./NotificationsItemCard";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";

import styles from "./NotificationsContainer.module.css";

interface Props {
    notifications: any;
    handleLoadMore: () => void;
    isLoadingMore: boolean;
    recordsCount: number;
    width: number;
}

export const NotificationsContainer: React.FC<Props> = ({
    notifications,
    handleLoadMore,
    isLoadingMore,
    recordsCount,
    width
}) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);
    const routeNotification = (action: { link: string; redirect: boolean }) => {
        if (action.redirect) {
            window.location.assign(action.link);
        } else {
            Router.push(action.link);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topCards}>
                {!isDesktopView ? (
                    <div className={styles.topCardsContainer}>
                        {notifications.map((item, idx) => (
                            <NotificationsItemCard
                                key={`${item.id}_${idx}`}
                                item={item}
                                routeNotification={routeNotification}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.accordionSurface}>
                        {notifications.map((item, idx) => (
                            <NotificationsItem
                                key={`${item.id}_${idx}`}
                                item={item}
                                routeNotification={routeNotification}
                            />
                        ))}
                    </div>
                )}
                <RobotsLoadMore
                    renderLoadMoreButton={recordsCount > notifications.length}
                    isLoadingMore={isLoadingMore}
                    onFetchMore={handleLoadMore}
                />
            </div>
        </div>
    );
};
