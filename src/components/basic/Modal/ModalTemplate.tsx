import React from "react";

import { EffectButton } from "..";
import { color } from "config/constants";
import styles from "./ModalTemplate.module.css";

interface Props {
    title: string;
    footer?: JSX.Element;
    children?: React.ReactNode;
    onClose?: React.MouseEventHandler;
    style?: React.CSSProperties;
    contentHeight?: number | string;
    isFrame?: boolean;
}

export const ModalTemplate: React.FC<Props> = ({ children, title, footer, onClose, style, contentHeight, isFrame }) => (
    <div className={styles.content} style={style}>
        {title && (
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
            </div>
        )}
        <div
            className={`${styles.body} ${isFrame ? styles.bodyNoMaxHeight : ""}`}
            style={{ height: contentHeight || "unset" }}>
            {children}
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
        {isFrame || (
            <div className={`${isFrame ? "" : styles.icon}`}>
                <EffectButton icon="windowclose" color={color.accent} onClick={onClose} />
            </div>
        )}
    </div>
);
