import React, { FC, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PAYMENTS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { DefaultTemplate } from "components/layout";
import NothingComponent from "components/common/NothingComponent";
import { PaymentHistoryTable } from "./PaymentHistoryTable";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import styles from "./PaymentHistoryPage.module.css";

const _PaymentHistoryPage: FC = (): any => {
    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);
    const mobile = !desktopSize;

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(GET_USER_PAYMENTS, {
        variables: {
            user_id
        }
    });

    if (loading) return <p>Loading...</p>;

    return (
        <DefaultTemplate title="Payment History" handleBackNavigation>
            <div style={{ padding: "5px 0 0 5px" }}>
                <div>
                    {loading || !data || !data.user_payments.length ? (
                        <div style={{ marginTop: "20px" }}>
                            <NothingComponent buttonSize="normal" buttonStyles={{ width: "200px", margin: "auto" }} />
                        </div>
                    ) : (
                        <div>
                            <div
                                className={mobile ? styles.exchangeContainerMobile : styles.tableGridRow}
                                style={{ padding: "0 20px" }}>
                                <div className={styles.exchange}>TRADER PLAN</div>
                            </div>
                            {data.user_payments.map((payment) => (
                                <PaymentHistoryTable key={payment.id} {...payment} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DefaultTemplate>
    );
};

export const PaymentHistoryPage = _PaymentHistoryPage;
