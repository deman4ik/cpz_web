import React, { useRef, memo } from "react";
import { useQuery } from "@apollo/client";

import { TOP_PERFORMANCE_ROBOTS } from "graphql/robots/queries";
import { PrimaryButton } from "components/basic";
import { SignalsListCard } from "./SignalsListCard";
import { LoadingDummy } from "./LoadingDummy";
import { useAnchor } from "../helpers";
import styles from "./index.module.css";

const _SignalsList: React.FC = () => {
    const { data, loading } = useQuery(TOP_PERFORMANCE_ROBOTS, {
        variables: { limit: 5 }
    });

    const refAnchor = useRef(null);
    const anchor = "top-performance-robots";
    useAnchor(refAnchor, anchor);

    return (
        <>
            {loading || !data ? (
                <LoadingDummy />
            ) : (
                <>
                    <a ref={refAnchor} id={anchor} className="visually-hidden">
                        Top Performance Robots
                    </a>
                    <h2 className={styles.title}>Top Performance Robots</h2>
                    <div className={styles.container}>
                        {data.v_robot_stats
                            .filter((item) => item.robot)
                            .map((item) => (
                                <SignalsListCard key={item.robot.id} robot={item.robot} />
                            ))}
                        <div className={styles.moreBtn}>
                            <PrimaryButton title="More Robots" href="/robots" type="primary" />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const SignalsList = memo(_SignalsList);
