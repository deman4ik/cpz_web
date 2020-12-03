import { ChartLineVariant } from "assets/icons/svg";
import React from "react";

export const EmptyChart: React.FC = () => {
    const color = "var(--accent)";
    return (
        <div className="container">
            <ChartLineVariant size={50} color={color} />
            <span className="label">Not enough statistics</span>
            <style jsx>
                {`
                    .container {
                        color: ${color};
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    }
                    .label {
                        font-size: 20px;
                    }
                `}
            </style>
        </div>
    );
};
