import React, { useRef, memo } from "react";
import Slider from "react-slick";
import { HappyUser } from "./HappyUser";
import { testimonialsContent } from "./helper";
import { useAnchor } from "../helpers";
import { ArrowSliderIcon } from "assets/icons/svg";
import styles from "./index.module.css";

export const SliderArrow = (props): any => {
    const { className, onClick } = props;
    return (
        <div className={`${className} ${styles.arrow}`} onClick={onClick}>
            <ArrowSliderIcon rotate={props.rotate} />
        </div>
    );
};

const _Feedback = () => {
    const refAnchor = useRef(null);
    const anchor = "feedback";
    useAnchor(refAnchor, anchor);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SliderArrow className={styles.arrow} rotate="rotate(180deg)" />,
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
            <a ref={refAnchor} id={anchor} className="visually-hidden">
                What people are actually thinking about Cryptuoso
            </a>
            <h2 className={styles.title}>What people are actually thinking about Cryptuoso</h2>
            <div className={styles.aboutus}>
                <Slider {...settings}>
                    {testimonialsContent.map((item) => (
                        <HappyUser key={item.name} item={item} />
                    ))}
                </Slider>
            </div>
        </>
    );
};

export const Feedback = memo(_Feedback);
