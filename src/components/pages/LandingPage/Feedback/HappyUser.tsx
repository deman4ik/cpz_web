import React, { useState } from "react";
import Image from "next/image";
import styles from "./HappyUser.module.css";

export const HappyUser = ({ item }): any => {
    const fullText = item.testimonial.split(" ");
    const MAX_TEXT_LENGHT = 50;
    const fullTextLength = fullText && fullText.length;
    const shortText = fullText.slice(0, MAX_TEXT_LENGHT);
    const [restText, setText] = useState([]);

    const handlerOnText = () => {
        setText(fullText.slice(MAX_TEXT_LENGHT, fullTextLength));
    };

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <Image src={`/img/avatars/${item.avatar}`} alt={item.name} width={70} height={70} />
                    <p className={styles.colTitle}>{item.name}</p>
                </div>
                <p className={styles.colText}>
                    {`${shortText.join(" ")} ${restText.join(" ")}`}
                    {fullTextLength > MAX_TEXT_LENGHT && restText.length === 0 && (
                        <button className={styles.button} type="button" onClick={handlerOnText}>
                            <b>...&nbsp; Read more</b>
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};
