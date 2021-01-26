import React from "react";
import { useMutation } from "@apollo/client";

import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { SET_MODAL_STATE } from "graphql/local/mutations";
import { MODAL_VISIBLE } from "graphql/local/queries";
import { RobotsItem, RobotsItemCard } from "../RobotsItems";
import { AddRobotsCard } from "./AddRobotsCard";
import { RobotsHeader } from "components/ui/RobotsItems";
import styles from "./index.module.css";
import { useDummyCarts } from "hooks/useDummyCarts";
import { DummyCards } from "components/common";

interface Props {
    data: any;
    width: number;
    displayType: string;
}

const cartWidth = 408;
export const RobotsPageContainer: React.FC<Props> = ({ data, width, displayType }) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
    const { dummyCards } = useDummyCarts(width, cartWidth, data.length + 1);

    const [setSubscride] = useMutation(SET_MODAL_STATE, {
        refetchQueries: [{ query: MODAL_VISIBLE }]
    });

    const robotSubscribe = ({ variables }) => {
        setSubscride({ variables });
    };

    return (
        <>
            {isDesktopView ? (
                <div className={styles.container}>
                    <RobotsHeader />
                    {data.map((item) => (
                        <RobotsItem
                            key={item.id}
                            item={item}
                            robotSubscribe={robotSubscribe}
                            displayType={displayType}
                            lastItem={false}
                        />
                    ))}
                    <AddRobotsCard displayType={displayType} />
                </div>
            ) : (
                <div className={styles.containerCard}>
                    {data.map((item) => (
                        <RobotsItemCard
                            key={item.id}
                            item={item}
                            robotSubscribe={robotSubscribe}
                            displayType={displayType}
                        />
                    ))}
                    <AddRobotsCard displayType={displayType} mobile />
                    {DummyCards(dummyCards, cartWidth)}
                </div>
            )}
        </>
    );
};
