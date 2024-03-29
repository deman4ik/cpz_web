import React, { memo } from "react";
import Image from "next/image";
import { descriptionRobots, descriptionFirstLine } from "../helpers";
import styles from "./DescriptionView.module.css";
import landing_styles from "../index.module.css";

const _DescriptionView: React.FC = () => (
    <div className={styles.container}>
        <div className={landing_styles.robotsCols}>
            <div className={landing_styles.robotsRow}>
                {descriptionFirstLine.map((item, idx) => (
                    <div className={landing_styles.robotsCol} key={idx}>
                        <div className={`${styles.icon} ${styles.heightIcon}`}>
                            <div style={item.imgStyle}>
                                <Image quality={90} src={`/img/${item.imgSrc}.png`} alt="" {...item.imgStyle} />
                            </div>
                        </div>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={landing_styles.robotsColText}>{item.text}</div>
                    </div>
                ))}
            </div>
            <div className={landing_styles.robotsRow}>
                {descriptionRobots.map((item, idx) => (
                    <div key={idx} className={landing_styles.robotsCol}>
                        <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
                            <div style={item.imgStyle}>
                                <Image quality={90} src={`/img/robots-icon-${idx + 1}.png`} alt="" {...item.imgStyle} />
                            </div>
                        </div>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={landing_styles.robotsColText}>{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const DescriptionView = memo(_DescriptionView);
