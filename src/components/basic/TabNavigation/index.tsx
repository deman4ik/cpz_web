import React, { FC, memo, useState } from "react";

// types
import { TabSchema } from "./types";

// components
import Tabs from "./Tabs";

//styles
import styles from "./styles/index.module.css";

type Props = {
    tabSchema: TabSchema;
    defaultActiveTab?: number;
};

const TabNavigation: FC<Props> = ({ tabSchema, defaultActiveTab }): JSX.Element => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

    return (
        <div className={styles.container}>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabSchema={tabSchema} />
            {tabSchema[activeTab].tabPage}
        </div>
    );
};

export default memo(TabNavigation);
