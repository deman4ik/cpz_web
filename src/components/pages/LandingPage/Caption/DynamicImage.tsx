import React from "react";
import Particles from "react-particles-js";

import useWindowDimensions from "hooks/useWindowDimensions";
import { color } from "config/constants";
import styles from "./index.module.css";

interface DinamicProps {
    distanceToBoundary?: number;
}

const DinamicImage: React.FC<DinamicProps> = ({ distanceToBoundary }) => {
    const { width, height } = useWindowDimensions();

    return (
        <div className={styles.headerBgImg}>
            <Particles
                height={`${distanceToBoundary || height}px`}
                params={{
                    particles: {
                        number: {
                            value: width <= 768 ? 25 : width <= 992 ? 50 : 100
                        },
                        size: { value: 3 },
                        color: { value: color.primary },
                        line_linked: { color: color.primary }
                    }
                }}
            />
        </div>
    );
};

export default DinamicImage;
