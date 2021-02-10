import React, { memo } from "react";
import Slider from "react-slick";
import styles from "./index.module.css";
import { OurHappyUser } from "./OurHappyUser";
import { foundersContent } from "../Founders/helpres";

import { ArrowSliderIcon } from "assets/icons/svg";

function SliderArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowSliderIcon rotate={props.rotate} />
        </div>
    );
}

const _OurHappyUsers = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SliderArrow rotate="rotate(180deg)" />,
        prevArrow: <SliderArrow />,
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
                        <OurHappyUser key={item.avatar} item={item} />
                    ))}
                    {foundersContent.map((item) => (
                        <OurHappyUser key={item.avatar} item={item} />
                    ))}
                </Slider>
            </div>
        </>
    );
};

export const OurHappyUsers = memo(_OurHappyUsers);
