import React, { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NavItem } from "./NavItem";
import { menuItems } from "./constants";
import { PageType } from "config/types";
import styles from "./styles/NavBar.module.css";

interface Props {
    activeTab: PageType;
    fullSize?: boolean;
}

const _NavBar: React.FC<Props> = ({ activeTab, fullSize = false }) => {
    const router = useRouter();
    const handleOnClick = (path: string, external: boolean) => {
        if (external) {
            window.location.assign(path);
        } else {
            router.push(`/${path}`).then(() => window.scrollTo(0, 0));
        }
    };

    return (
        <div className={`${styles.navBar} ${fullSize ? styles.fullSize : ""}`}>
            <div className={styles.navBarContainer}>
                <div className={styles.logoWrapper}>
                    <div className={`${styles.logo}`}>
                        <Image quality={90} src="/img/logo-accent.png" alt="" width={72} height={71} />
                    </div>
                </div>
                <div className={styles.itemGroup}>
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.label}
                            item={item}
                            active={activeTab === item.label}
                            handleOnClick={handleOnClick}
                            styles={styles}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const NavBar = memo(_NavBar);
