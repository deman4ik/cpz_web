import React, { memo, useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PrimaryButton } from "components/basic";
import { Header } from "components/layout";
import styles from "./index.module.css";

const DinamicImageWithNoSSR = dynamic(() => import("./DynamicImage"), {
    loading: () => <div className={styles.loading} />,
    ssr: false
});

const subTitle = "Just invest –\n robots do the rest";

export const _Caption: React.FC = () => {
    const boundaryOfElement = useRef(null);
    const [boundary, setBoundary] = useState(0);

    const BoundaryOfButton = () => {
        useEffect(() => {
            const elementProperties = boundaryOfElement.current;
            setBoundary(elementProperties.offsetTop + elementProperties.offsetHeight);
        });
        return null;
    };

    return (
        <>
            <DinamicImageWithNoSSR distanceToBoundary={boundary} />
            <div className={styles.header}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.headerBody}>
                        <div className={styles.groupBrand}>
                            <div className={styles.brand}>
                                <div className={styles.brandName}>CRYPTUOSO</div>
                                <div className={styles.brandRights}>®</div>
                            </div>
                            <h1 className={styles.title}>
                                Cryptocurrency trading robots for&nbsp;your&nbsp;successful investment
                            </h1>
                            <div className={styles.subTitle}>{subTitle}</div>
                            <div ref={boundaryOfElement} className={styles.headerGroupBtn}>
                                <PrimaryButton
                                    title="TRY IT FREE"
                                    type="secondary"
                                    href="/auth/login"
                                    className={styles.headerBtn}
                                />
                                <BoundaryOfButton />
                            </div>
                        </div>
                        <div className={styles.logoWrapper}>
                            <div className={styles.bigLogo}>
                                <Image quality={90} priority src="/img/big-logo.png" alt="" width={621} height={592} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Caption = memo(_Caption);
