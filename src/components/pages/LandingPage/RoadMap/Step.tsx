import React from "react";
import Image from "next/image";
import styles from "./Step.module.css";
import { StepProps } from "../types";

interface Props {
    step: StepProps;
    idx: number;
    isVertical: boolean;
}
const active = 7;
export const Step: React.FC<Props> = ({ step, idx, isVertical }) => {
    const isActiveCheck = active === idx + 1;
    const isActiveLine = active >= idx + 1;
    const isFuture = active < idx + 1;
    const isOdd = (idx + 1) % 2 !== 0;

    const getTringleImg = () => {
        let renderTriangle;
        if (isVertical) {
            if (isActiveCheck) {
                renderTriangle = "/img/roadmap-triangle-cur-mob.png";
            } else if (isActiveLine) {
                renderTriangle = "/img/roadmap-triangle-fin-mob.png";
            } else if (isFuture) {
                renderTriangle = "/img/roadmap-triangle-will-mob.png";
            }
        } else if (isActiveCheck) {
            renderTriangle = isOdd ? "/img/roadmap-triangle-cur-odd.png" : "/img/roadmap-triangle-cur.png";
        } else if (isActiveLine) {
            renderTriangle = isOdd ? "/img/roadmap-triangle-fin-odd.png" : "/img/roadmap-triangle-fin.png";
        } else if (isFuture) {
            renderTriangle = isOdd ? "/img/roadmap-triangle-will-odd.png" : "/img/roadmap-triangle-will.png";
        }
        return renderTriangle;
    };

    const getCircleCloud = () => {
        const circleCloud = [styles.circleCloud];
        if (isOdd) {
            circleCloud.push(styles.oddBottom);
        } else {
            circleCloud.push(styles.oddTop);
        }
        if (isFuture) circleCloud.push(styles.isFuture);
        if (isActiveCheck) {
            circleCloud.push(styles.activeCloud);
            circleCloud.push(styles.circleCloudCorrect);
        }
        if (isActiveLine && !isActiveCheck) circleCloud.push(styles.isFinished);
        return circleCloud;
    };

    const getTriangleStyle = () => {
        const triangle = [styles.triangle];
        if (!isOdd) {
            triangle.push(styles.oddTriangleBottom);
        } else {
            triangle.push(styles.oddTriangleTop);
        }
        return triangle;
    };

    const getLineStyle = () => {
        const line = [styles.line];
        if (isActiveLine) line.push(styles.activeLine);
        if (isActiveCheck && idx === active - 1) line.push(styles.endActiveLine);
        return line;
    };

    return (
        <>
            <div className={`${styles.line}${isActiveLine ? ` ${styles.activeLine}` : ""}`} />
            <div className={styles.circle}>
                {isFuture ? (
                    <div className={styles.circleFuture} />
                ) : (
                    <div
                        className={`${styles.circleCheckActive} ${
                            isActiveCheck ? styles.circleCheck : styles.circleUnCheck
                        }`}>
                        <Image src="/img/roadmap-check.png" alt="" width={37} height={37} />
                    </div>
                )}
                <div className={getCircleCloud().join(" ")}>
                    {console.log(getTringleImg())}
                    <img className={getTriangleStyle().join(" ")} src={getTringleImg()} alt="" />
                    <div className={styles.circleBody}>
                        <div className={`${styles.circleTitle}${isFuture ? ` ${styles.isFutureText}` : ""}`}>
                            {step.date}
                        </div>
                        <div className={`${styles.circleText}${isFuture ? ` ${styles.isFutureText}` : ""}`}>
                            {step.title}
                        </div>
                    </div>
                </div>
            </div>
            <div className={getLineStyle().join(" ")} />
        </>
    );
};
