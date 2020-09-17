import React, { memo } from "react";
import { EffectButton } from "components/basic/EffectButton";

import styles from "./styles/NavHeader.module.css";

interface Props {
    title: string;
    subTitle?: string;
    toolbar: any;
    handlePressBack: () => void;
    style?: React.CSSProperties;
}

const _NavHeader: React.FC<Props> = ({ title, subTitle, toolbar, handlePressBack, style }) => (
    <div className={styles.header} style={style}>
        <div className={styles.wrapper}>
            {handlePressBack ? <EffectButton onClick={handlePressBack} icon="arrowleft" /> : null}
            <div className={styles.titleGroup} style={{ marginLeft: handlePressBack ? 38 : 10 }}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
            </div>
            {toolbar}
        </div>
    </div>
);

export const NavHeader = memo(_NavHeader);
