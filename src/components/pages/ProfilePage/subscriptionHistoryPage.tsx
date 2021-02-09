import React, { memo, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PageType, RobotsType } from "config/types";
import { GET_SUBSCRIPTIONS_NAME, GET_USER_SUBS, GET_USER_SUBS_BY_CREATED_AT } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { DefaultTemplate } from "components/layout";
import NothingComponent from "components/common/NothingComponent";
import { capitalize } from "lodash";
import OpenPositionsTable from "../../ui/RobotOpenPositions/OpenPositionsTable";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";

import styles from "./subscriptionHistoryPage.module.css";

interface Props {
    type: RobotsType;
}

const _SubscriptionHistoryPage: React.FC<Props> = ({ type }) => {
    const typeIsSignals = type === RobotsType.signals;

    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);

    const mobile = !desktopSize;

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data: userSubs, loading: loadingUserSubs } = useQuery(GET_USER_SUBS_BY_CREATED_AT, {
        variables: {
            user_id
        }
    });
    const { data, loading: loadingSubsName } = useQuery(GET_SUBSCRIPTIONS_NAME);

    const subsName = loadingSubsName || data.subscriptions[0].name;
    // const userSubsStatus = userSubs && userSubs.user_subs[0].status;

    console.log(userSubs.user_subs[0]);
    console.log(subsName);

    return (
        <DefaultTemplate
            page={PageType[type]}
            title="Subscription History"
            subTitle={capitalize(type)}
            handleBackNavigation>
            <div style={{ padding: "5px 0 0 5px" }}>
                <div>
                    {loadingUserSubs || (userSubs && userSubs.user_subs.length === 0) ? (
                        <div style={{ marginTop: "20px" }}>
                            <NothingComponent
                                beforeButtonKeyWord={type}
                                beforeButtonMessage={`${type} positions`}
                                buttonSize="normal"
                                buttonStyles={{ width: "200px", margin: "auto" }}
                            />
                        </div>
                    ) : (
                        userSubs &&
                        userSubs.user_subs.map(({ subscriptionOption }, index) => (
                            <div key={subscriptionOption.code} style={{ marginTop: (index > 0 && 10) || 0 }}>
                                <div
                                    className={mobile ? styles.exchangeContainerMobile : styles.tableGridRow}
                                    style={{ padding: "0 20px" }}>
                                    <div className={styles.exchange}>{subscriptionOption.name}</div>
                                </div>
                                <div>
                                    {userSubs &&
                                        userSubs.user_subs.map((asset) => (
                                            <div key={asset.asset}>
                                                <div className={styles.assetHeader}>
                                                    {asset.asset}
                                                    {mobile && (
                                                        <div className={styles.assetHeaderMobileStats}>
                                                            <div>Amount:&nbsp;</div>
                                                            <div />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DefaultTemplate>
    );
};

export const SubscriptionHistoryPage = memo(_SubscriptionHistoryPage);
