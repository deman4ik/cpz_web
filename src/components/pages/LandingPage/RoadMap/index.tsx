import React, { memo, useEffect, useState } from "react";

import { Step } from "./Step";
import useWindowDimensions from "hooks/useWindowDimensions";
import { steps } from "../helpers";
import styles from "./index.module.css";

const _RoadMap: React.FC = () => {
    const [show, setShow] = useState(false);
    const { width } = useWindowDimensions();
    const isVertical = width <= 992;
    useEffect(() => {
        setShow(width > 0);
    }, [width]);
    return (
        <>
            {show ? (
                <>
                    <a name="roadmap" className="visually-hidden">
                        Cryptuoso roadmap
                    </a>
                    <h2 className={styles.title}>Cryptuoso roadmap</h2>
                    <div className={styles.container}>
                        <div className={styles.stepsContainer}>
                            {steps.map((step, idx) => (
                                <Step step={step} idx={idx} key={idx} isVertical={isVertical} />
                            ))}
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export const RoadMap = memo(_RoadMap);
