import React, { memo } from "react";
import { useQuery } from "@apollo/client";

import { GET_LANDING_ROBOTS } from "graphql/robots/queries";
import { PrimaryButton } from "components/basic";
import { SignalsListCard } from "./SignalsListCard";
import { LoadingDummy } from "./LoadingDummy";
import styles from "./index.module.css";

const _SignalsList: React.FC = () => {
    const { data, loading } = useQuery(GET_LANDING_ROBOTS, {
        variables: { limit: 5 }
    });

    return (
        <>
            {loading || !data ? (
                <LoadingDummy />
            ) : (
                <div className={styles.container}>
                    {data.v_robots_stats.map((item) => (
                        <SignalsListCard key={item.robots.id} robot={item.robots} />
                    ))}
                    <div className={styles.moreBtn}>
                        <PrimaryButton title="More Robots" href="/robots" type="primary" />
                    </div>
                </div>
            )}
        </>
    );
};

export const SignalsList = memo(_SignalsList);
