import React, { FC, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { DefaultTemplate } from "components/layout";
import NothingComponent from "components/common/NothingComponent";
import { SubscriptionHistoryTable } from "./SubscriptionHistoryTable";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import styles from "./subscriptionHistoryPage.module.css";

const _SubscriptionHistoryPage: FC = (): any => {
    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);
    const mobile = !desktopSize;

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });

    if (loading) return "Loading...";

    const userSubs = data.user_subs;
    const { subscription } = userSubs[0].subscriptionOption;

    return (
        <DefaultTemplate title="Subscription History" handleBackNavigation>
            <div style={{ padding: "5px 0 0 5px" }}>
                <div>
                    {loading || (userSubs && userSubs.length === 0) ? (
                        <div style={{ marginTop: "20px" }}>
                            <NothingComponent buttonSize="normal" buttonStyles={{ width: "200px", margin: "auto" }} />
                        </div>
                    ) : (
                        userSubs && (
                            <div>
                                <div
                                    className={mobile ? styles.exchangeContainerMobile : styles.tableGridRow}
                                    style={{ padding: "0 20px" }}>
                                    <div className={styles.exchange}>{subscription.name}</div>
                                </div>
                                {userSubs.map(({ subscriptionOption, status }, index) => (
                                    <SubscriptionHistoryTable
                                        key={`${subscriptionOption.subscription_id}-${index}`}
                                        userSubs={subscriptionOption}
                                        userStatus={status}
                                    />
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </DefaultTemplate>
    );
};

export const SubscriptionHistoryPage = _SubscriptionHistoryPage;
