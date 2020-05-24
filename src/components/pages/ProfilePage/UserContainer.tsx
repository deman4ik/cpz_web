import React from "react";

import { UserInfo } from "./UserInfo";
import { AccountBalance } from "./AccountBalance";
import styles from "./UserContainer.module.css";

interface Props {
    width: number;
}

export const UserContainer: React.FC<Props> = ({ width }) => (
    <div className={styles.blocksContainer}>
        <div className={styles.block}>
            <UserInfo width={width} />
        </div>
        <div className={styles.block}>
            <AccountBalance />
        </div>
    </div>
);
