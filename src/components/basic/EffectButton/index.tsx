import React from "react";

import { ArrowLeftIcon, WindowCloseIcon } from "../../../assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    icon?: string;
    onClick?: React.MouseEventHandler;
    color?: string;
}

const components = {
    arrowleft: ArrowLeftIcon,
    windowclose: WindowCloseIcon
};

export const EffectButton: React.FC<Props> = ({ icon, onClick, color = "white" }) => {
    const SpecificIcon = components[icon];

    return (
        <div className={[styles.btn, styles.ripple].join(" ")} onClick={onClick}>
            <i className={styles.icon}>
                <SpecificIcon size={22} color={color} />
            </i>
        </div>
    );
};
