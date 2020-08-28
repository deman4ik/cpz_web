import React, { useMemo, memo, useContext } from "react";
import { useQuery } from "@apollo/client";

import { GET_USER_EXCHANGES } from "graphql/profile/queries";
import { ExchangeKeysContainer } from "./ExchangeKeysContainer";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    title: string;
}

export const _ExchangeKeys: React.FC<Props> = ({ title }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(GET_USER_EXCHANGES, {
        variables: { user_id }
    });
    const formatData = useMemo(() => (!loading && data ? data.userExchange : []), [loading, data]);

    return (
        <div className={styles.container}>
            <div className={styles.regionTitle}>{title}</div>
            {loading ? <LoadingIndicator /> : <ExchangeKeysContainer formatData={formatData} />}
        </div>
    );
};

export const ExchangeKeys = memo(_ExchangeKeys);
