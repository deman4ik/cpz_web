import React, { memo } from "react";
import Router from "next/router";

import { useShowDimension } from "../../../hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { PerformanceItem } from "./PerformanceItem";
import { PerformanceItemCard } from "./PerformanceItemCard";
import { PerformanceHeader } from "./PerformanceHeader";
import { DummyCards } from "../../common";
import { getItem } from "./helpers";
import styles from "./PerformanceComponent.module.css";

interface Props {
    width: number;
    displayType: string;
    title?: string;
}

const cardWidth = 410;
const _PerformanceEmpty: React.FC<Props> = ({ width, displayType, title }) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
    const handleRedirectToDetailView = (path: string) => {
        Router.push(`/${displayType}/stats?${path}`);
    };
    const item = getItem(title || displayType);

    return (
        <>
            {isDesktopView ? (
                <div className={styles.container}>
                    <PerformanceItem item={item} onRedirectToDetailView={handleRedirectToDetailView} compact noShadow />
                </div>
            ) : (
                <div className={styles.cardItemsContainer}>
                    <PerformanceItemCard item={item} onRedirectToDetailView={handleRedirectToDetailView} />
                    {DummyCards(1, cardWidth)}
                </div>
            )}
        </>
    );
};

export const PerformanceEmpty = memo(_PerformanceEmpty);
