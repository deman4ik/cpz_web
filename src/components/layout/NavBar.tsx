import React, { memo } from "react";
import { EffectButton } from "../basic/EffectButton";

interface Props {
    title: string;
    subTitle?: string;
    toolbar: any;
    hideToolbar: boolean;
    handlePressBack: () => void;
    style?: React.CSSProperties;
}

const _NavBar: React.FC<Props> = ({ title, subTitle, toolbar, handlePressBack, hideToolbar, style }) => (
    <div className="navBar" style={style}>
        <div className="wrapper">
            {handlePressBack ? <EffectButton onClick={handlePressBack} icon="arrowleft" /> : null}
            <div className="titleGroup" style={{ marginLeft: handlePressBack ? 38 : 10 }}>
                <div className="title">{title}</div>
                <div className="subTitle">{subTitle}</div>
            </div>
            {toolbar}
        </div>
        <style jsx>
            {`
                .navBar {
                    position: sticky;
                    margin-left: 200px;
                    background-color: var(--dark);
                    height: 56px;
                    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.24);
                }
                .wrapper {
                    position: relative;
                    display: flex;
                    height: 100%;
                    align-items: center;
                    flex-direction: row;
                }
                .titleGroup {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    position: absolute;
                    left: 0;
                }
                .title {
                    font-size: 18px;
                    font-weight: 500;
                    color: white;
                    text-align: left;
                }
                .subTitle {
                    font-size: var(--small1);
                    color: var(--accent);
                }
                @media (max-width: 1200px) {
                    .navBar {
                        margin-left: 56px;
                    }
                }
                @media (max-width: 780px) {
                    .titleGroup {
                        display: ${hideToolbar ? "none" : "flex"};
                    }
                }
                @media (max-width: 480px) {
                    .navBar {
                        margin-left: 0;
                    }
                }
            `}
        </style>
    </div>
);

export const NavBar = memo(_NavBar);
