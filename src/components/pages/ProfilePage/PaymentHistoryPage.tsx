import React, { FC, useContext, useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PAYMENTS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { DefaultTemplate } from "components/layout";
import NothingComponent from "components/common/NothingComponent";
import { PaymentHistoryTable } from "./PaymentHistoryTable";
import { RobotsLoadMore as HistoryLoadMore } from "components/ui/RobotsLoadMore";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import styles from "./PaymentHistoryPage.module.css";

interface UserPaymentData {
    user_payments: any[];
}

const _PaymentHistoryPage: FC = (): any => {
    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);
    const mobile = !desktopSize;

    const SHOW_LIMIT = 15;
    const [limit, setLimit] = useState(SHOW_LIMIT);
    const [isLoadMoreButton, setLoadMoreButton] = useState(true);

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading, fetchMore } = useQuery<UserPaymentData>(GET_USER_PAYMENTS, {
        variables: {
            user_id,
            offset: 0,
            limit
        }
    });

    const onFetchMore = useCallback(() => {
        const currentLength = data.user_payments.length || 0;
        fetchMore({
            variables: {
                offset: currentLength,
                limit: currentLength
            }
        })
            .then(({ data: moreResult }) => {
                setLimit(currentLength + moreResult.user_payments.length);
                if (moreResult.user_payments.length < SHOW_LIMIT) setLoadMoreButton(false);
            })
            .catch((e) => console.error(e));
    }, [fetchMore, data?.user_payments.length]);

    if (loading || !data) return <p>Loading...</p>;

    return (
        <DefaultTemplate title="Payment History" handleBackNavigation>
            <div>
                <div>
                    {loading || !data || !data.user_payments.length ? (
                        <div style={{ marginTop: "20px" }}>
                            <NothingComponent buttonSize="normal" buttonStyles={{ width: "200px", margin: "auto" }} />
                        </div>
                    ) : (
                        <div className={styles.wrapper}>
                            <div
                                className={mobile ? styles.exchangeContainerMobile : styles.tableGridRow}
                                style={{ padding: "0 20px" }}
                            />
                            {data.user_payments.map((payment) => (
                                <PaymentHistoryTable key={payment.id} {...payment} />
                            ))}
                        </div>
                    )}
                </div>
                <HistoryLoadMore
                    renderLoadMoreButton={Boolean(isLoadMoreButton)}
                    isLoadingMore={loading}
                    onFetchMore={onFetchMore}
                />
            </div>
        </DefaultTemplate>
    );
};

export const PaymentHistoryPage = _PaymentHistoryPage;
