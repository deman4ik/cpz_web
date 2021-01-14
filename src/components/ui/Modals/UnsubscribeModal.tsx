import React, { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { UNSUBSCRIBE_FROM_SIGNALS } from "graphql/signals/mutations";
import { UNSUBSCRIBE } from "graphql/local/mutations";
import { Button } from "components/basic";
import { LoadingIndicator, ErrorLine } from "components/common";
import styles from "./index.module.css";
import Router from "next/router";
import { currentPage, Pages } from "components/ui/Modals/helpers";
import { RobotsType } from "config/types";

interface Props {
    onClose: (needsRefreshing?: boolean) => void;
    setTitle: (title: string) => void;
}

const _UnsubscribeModal: React.FC<Props> = ({ onClose, setTitle }) => {
    const [formError, setFormError] = useState("");
    const { data } = useQuery(ROBOT(RobotsType.signals));
    const [unsubscribeSend, { loading }] = useMutation(UNSUBSCRIBE_FROM_SIGNALS);
    const [unsubscribe] = useMutation(UNSUBSCRIBE);

    useEffect(() => {
        setTitle(`Unfollowing ${data?.robot.name}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOnSubmit = () => {
        unsubscribeSend({ variables: { robotId: data.robot.id } })
            .then((response) => {
                if (response.data.userSignalUnsubscribe.result) {
                    unsubscribe({
                        variables: { cache: data.robot.cache, chartData: data.ChartData }
                    }).catch((e) => console.error(e));
                } else {
                    setFormError(response.data.userSignalUnsubscribe.result);
                }
                if (currentPage(Router.pathname) === Pages.signal) {
                    Router.push("/signals");
                }

                onClose(true);
            })
            .catch((e) => console.error(e));
    };

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <ErrorLine formError={formError} />
                    <div className={styles.bodyTitle}>
                        Are you sure you want to unsubscribe{"\n"}from {data ? data.robot.name : ""} signals?
                    </div>
                    <div className={styles.bodyText}>You will lose all your signals statistics for this robot!</div>
                    <div className={styles.btns}>
                        <Button
                            className={styles.btn}
                            title="Yes"
                            icon="check"
                            type="success"
                            onClick={handleOnSubmit}
                        />
                        <Button className={styles.btn} title="No" icon="close" type="primary" onClick={onClose} />
                    </div>
                </>
            )}
        </>
    );
};

export const UnsubscribeModal = memo(_UnsubscribeModal);
