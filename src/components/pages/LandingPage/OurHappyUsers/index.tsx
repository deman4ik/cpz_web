import React, { memo } from "react";
import Slider from "react-slick";
import styles from "./index.module.css";
import { FoundersItem } from "../Founders/FoundersItem";
import { foundersContent } from "../Founders/helpres";

const _OurHappyUsers = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            <h2 className={styles.title}>Our happy users</h2>
            <div className={styles.aboutus}>
                <Slider {...settings}>
                    {foundersContent.map((item) => (
                        <FoundersItem key={item.avatar} item={item} />
                    ))}
                    {foundersContent.map((item) => (
                        <FoundersItem key={item.avatar} item={item} />
                    ))}
                </Slider>
            </div>
        </>
    );
};

export const OurHappyUsers = memo(_OurHappyUsers);
