import React, { memo } from "react";
import { MenuButton } from "./constants";

import styles from "./styles/Header.module.css";

interface Props {
    title: string;
    subTitle?: string;
    toolbar: any;
    toggleMenu: any;
    style?: React.CSSProperties;
    withToolbar: boolean;
    fullLength: boolean;
    withNavOpen: boolean;
}

const _NavHeader: React.FC<Props> = ({
    title,
    subTitle,
    toolbar,
    toggleMenu,
    style,
    withToolbar,
    fullLength,
    withNavOpen
}) => (
    <div
        className={`${styles.header} ${fullLength ? styles.fullLength : withNavOpen ? styles.withNavOpen : ""}`}
        style={style}>
        <div className={styles.wrapper}>
            <MenuButton onClick={toggleMenu} />
            <div className={`${styles.titleGroup} ${!withToolbar ? styles.visible : ""}`}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
            </div>
            {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        </div>
    </div>
);

export const NavHeader = memo(_NavHeader);
