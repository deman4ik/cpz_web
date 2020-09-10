import React from "react";

import { ArrowLeftIcon, WindowCloseIcon, ArrowRightIcon, MenuIcon } from "assets/icons/svg";
import styles from "./index.module.css";

interface Props {
    icon?: string;
    onClick?: React.MouseEventHandler;
    color?: string;
}

const icons = {
    arrowleft: ArrowLeftIcon,
    arrowright: ArrowRightIcon,
    windowclose: WindowCloseIcon,
    menu: MenuIcon
};

export const EffectButton: React.FC<Props> = ({ icon, onClick, color = "white" }) => {
    const Icon = icons[icon];

    return (
        <div className={[styles.btn, styles.ripple].join(" ")} onClick={onClick}>
            <i className={styles.icon}>
                <Icon size={22} color={color} />
            </i>
        </div>
    );
};
