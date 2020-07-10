import React, { memo } from "react";
import { v4 as uuid } from "uuid";

const RobotsNotDesktopView = ({ data }) => {
    return (
        <div>
            {data.map(({ title, notDesktopVal }) => (
                <div key={uuid()}>
                    <div>{title}</div>
                    <div>{notDesktopVal}</div>
                </div>
            ))}
        </div>
    );
};

export default memo(RobotsNotDesktopView);
