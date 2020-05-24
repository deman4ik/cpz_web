import React, { memo } from "react";

import { colorAction } from "../../../config/utils";
import styles from "./OpenPositionsTitle.module.css";

interface Props {
    volume: number;
    title: string;
}

const _OpenPositionsTitle: React.FC<Props> = ({ volume, title }) => (
    <div className={styles.title}>
        <div className={styles.titleText} style={colorAction(volume > 0)}>
            {`${volume > 0 ? "+" : ""}${volume} ${title}`}
        </div>
    </div>
);

export const OpenPositionsTitle = memo(_OpenPositionsTitle);
