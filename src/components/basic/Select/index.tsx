import React from "react";

interface Props {
    data: any;
    value: string;
    width?: number;
    enabled?: boolean;
    onChangeValue: (itemValue: any) => void;
}

export const Select: React.FC<Props> = ({ data, value, onChangeValue, width = 200, enabled = true }) => {
    const onChange = (e) => {
        onChangeValue(e.target.value);
    };
    return (
        <div className="select_container">
            <select value={value} onChange={onChange} className="select" disabled={!enabled}>
                {data.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <style jsx>
                {`
                    .select {
                        margin-bottom: 10px;
                        outline: none;
                        background-color: var(--darkBg);
                        color: var(--accent);
                        border-radius: 2px;
                        padding: 11px;
                        font-size: var(--normal1);
                        -moz-appearance: none;
                        -webkit-appearance: none;
                        width: ${width}px;
                        cursor: pointer;
                        opacity: ${enabled ? 1 : 0.5};
                    }

                    .select_container {
                        position: relative;
                        display: inline;
                    }
                    .select_container:after {
                        content: "";
                        width: 0;
                        height: 0;
                        position: absolute;
                        pointer-events: none;
                    }
                    .select_container:after {
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        top: 0.4rem;
                        right: 0.75em;
                        border-top: 8px solid var(--accent);
                        opacity: 0.5;
                    }
                    .select::-ms-expand {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};
