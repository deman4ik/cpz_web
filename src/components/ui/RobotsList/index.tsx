import React from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";

import { SET_MODAL_STATE } from "graphql/local/mutations";
import { MODAL_VISIBLE } from "graphql/local/queries";
import { SCREEN_TYPE } from "config/constants";
import { useShowDimension } from "hooks/useShowDimension";
import { RobotsHeader, RobotsItem, RobotsItemCard } from "../RobotsItems";
import { useDummyCarts } from "hooks/useDummyCarts";
import { DummyCards } from "components/common/DummyCards";
import { RobotsLoadMore } from "../RobotsLoadMore";
import styles from "./index.module.css";

interface Props {
    data: any;
    isLoadingMore: boolean;
    onFetchMore: () => void;
    counts: number;
    width: number;
    displayType: string;
}

const cartWidth = 408;
const SHOW_LIMIT = 12;
export const RobotsList: React.FC<Props> = (props) => {
    const { dummyCards } = useDummyCarts(props.width, cartWidth, props.data.length);
    const renderLoadMoreButton = props.data.length >= SHOW_LIMIT && props.data.length < props.counts;
    const { showDimension: isDesktopView } = useShowDimension(props.width, SCREEN_TYPE.WIDE);
    const handleRedirectToDetailView = (code: string) => {
        Router.push(`/${props.displayType}/robot/${code}`);
    };

    const [setSubscride] = useMutation(SET_MODAL_STATE, {
        refetchQueries: [{ query: MODAL_VISIBLE }]
    });

    const robotSubscribe = (variables) => {
        setSubscride(variables);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {isDesktopView ? (
                    <div className={styles.box}>
                        <RobotsHeader />
                        {props.data.map((item, idx) => (
                            <RobotsItem
                                key={item.id}
                                item={item}
                                robotSubscribe={robotSubscribe}
                                displayType={props.displayType}
                                lastItem={idx === props.data.length - 1}
                                onRedirectToDetailView={handleRedirectToDetailView}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.containerCart}>
                        {props.data.map((item) => (
                            <RobotsItemCard
                                key={item.id}
                                item={item}
                                robotSubscribe={robotSubscribe}
                                displayType={props.displayType}
                                onRedirectToDetailView={handleRedirectToDetailView}
                            />
                        ))}
                        {DummyCards(dummyCards, cartWidth)}
                    </div>
                )}
            </div>
            <RobotsLoadMore
                renderLoadMoreButton={renderLoadMoreButton}
                isLoadingMore={props.isLoadingMore}
                onFetchMore={props.onFetchMore}
            />
        </div>
    );
};
