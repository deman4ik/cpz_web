import React, { SetStateAction } from "react";

//components
import { TabButton } from "components/basic";

//types
import { TabSchema } from "./types";

//styles
import styles from "./styles/Tabs.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";

type Props = {
    activeTab: number;
    setActiveTab: (val: SetStateAction<number>) => void;
    tabSchema: TabSchema;
};

const Tabs = ({ activeTab, setActiveTab, tabSchema }: Props): JSX.Element => {
    const { width } = useWindowDimensions();
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {tabSchema.map(({ title }, index) => (
                    <div key={index} className={styles.tab}>
                        <TabButton
                            title={title}
                            isActive={activeTab === index}
                            handleOnClick={() => setActiveTab(index)}
                            maxTextWidth={(width * 0.8) / tabSchema.length}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
