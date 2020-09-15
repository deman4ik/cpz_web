import React, { memo } from "react";
import { MenuButton } from "./constants";

import styles from "./styles/Header.module.css";

interface Props {
    title: string;
    subTitle?: string;
    toolbar: any;
    hideToolbar: boolean;
    toggleMenu: any;
    style?: React.CSSProperties;
}

const _NavHeader: React.FC<Props> = ({ title, subTitle, toolbar, toggleMenu, style }) => (
    <div className={styles.header} style={style}>
        <div className={styles.wrapper}>
            <MenuButton onClick={toggleMenu} />
            <div className={styles.titleGroup}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
            </div>
            {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        </div>
    </div>
);

export const NavHeader = memo(_NavHeader);
