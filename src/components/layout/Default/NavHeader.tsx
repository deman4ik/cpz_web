import React, { memo, useRef } from "react";
import { EffectButton } from "components/basic/EffectButton";

import styles from "./styles/NavHeader.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";

interface Props {
    title: string;
    subTitle?: string;
    toolbar?: any;
    handlePressBack: () => void;
    style?: React.CSSProperties;
}

const _NavHeader: React.FC<Props> = ({ title, subTitle, toolbar, handlePressBack, style }) => {
    const toolbarContainer = useRef(null);
    const toolbarWidth = toolbarContainer.current?.getBoundingClientRect().width;
    const { width: clientWidth } = useWindowDimensions();

    return (
        <div className={styles.header} style={style}>
            <div className={styles.wrapper}>
                {handlePressBack && <EffectButton onClick={handlePressBack} icon="arrowleft" />}
                <div
                    className={styles.titleGroup}
                    style={{
                        marginLeft: handlePressBack ? 38 : 10,
                        display: clientWidth < toolbarWidth * 1.5 ? "none" : "flex"
                    }}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subTitle}>{subTitle}</div>
                </div>
                <div ref={toolbarContainer} className={styles.toolbarContainer}>
                    {toolbar}
                </div>
            </div>
        </div>
    );
};

export const NavHeader = memo(_NavHeader);
