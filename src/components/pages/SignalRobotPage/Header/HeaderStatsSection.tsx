import React, { memo } from "react";
import { SCREEN_TYPE } from "config/constants";
import styles from "./styles/HeaderStatsSection.module.css";
import {
    HeaderStatsSectionItem,
    HeaderStatsSectionItemProps
} from "components/pages/SignalRobotPage/Header/HeaderStatsSectionItem";
import { useShowDimension } from "hooks/useShowDimension";

interface Props {
    config: HeaderStatsSectionItemProps[];
    width: number;
    columnsNum?: number;
}

const _HeaderStatsSection: React.FC<Props> = ({ config, columnsNum = 2, width }) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.TABLET);

    const numberOfColumns = isDesktopView ? columnsNum : 1;
    const gridColumnsString = Array.from({ length: numberOfColumns }, () => "auto").join(" ");

    return (
        <div className={styles.robotStats} style={{ gridTemplateColumns: gridColumnsString }}>
            {config.map((i) => (
                <HeaderStatsSectionItem key={i.label} {...i} />
            ))}
        </div>
    );
};

export const HeaderStatsSection = memo(_HeaderStatsSection);
