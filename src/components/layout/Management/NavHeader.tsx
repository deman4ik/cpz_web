import React, { memo } from "react";
import { EffectButton } from "components/basic/EffectButton";

interface Props {
    title: string;
    subTitle?: string;
    toolbar: any;
    hideToolbar: boolean;
    handleOpenMenu: any;
    style?: React.CSSProperties;
}

const _NavHeader: React.FC<Props> = ({ title, subTitle, toolbar, handleOpenMenu, hideToolbar, style }) => (
    <div className="header" style={style}>
        <div className="wrapper">
            <div className="menu_button_wrapper">
                <EffectButton onClick={handleOpenMenu} icon="menu" />
            </div>
            <div className="titleGroup">
                <div className="title">{title}</div>
                <div className="subTitle">{subTitle}</div>
            </div>
            {toolbar}
        </div>
        <style jsx>
            {`
                .header {
                    position: sticky;
                    top: 0;
                    z-index: 103;
                    background-color: var(--dark);
                    height: 56px;
                    width: 100%;
                }
                .wrapper {
                    position: relative;
                    display: flex;
                    height: 100%;
                    align-items: center;
                    flex-direction: row;
                }
                .menu_button_wrapper {
                    width: 56px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .titleGroup {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
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
                @media (max-width: 780px) {
                    .titleGroup {
                        display: ${hideToolbar ? "none" : "flex"};
                    }
                }
                @media (max-width: 480px) {
                    .header {
                        margin-left: 0;
                    }
                }
            `}
        </style>
    </div>
);

export const NavHeader = memo(_NavHeader);
