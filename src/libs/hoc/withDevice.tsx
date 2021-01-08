/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

import { DeviceContext } from "../../providers/deviceContext";
import { getDisplayName } from "../getDisplayName";
import { DeviceProps } from "config/types";
import { NextPage, NextPageContext } from "next";
import { NextPageProps } from "../../types";

export const withDevice = (Page: NextPage) => {
    const WithDevice = (props: NextPageProps) => {
        return (
            <DeviceContext.Provider value={props.device!}>
                <Page {...props} />
            </DeviceContext.Provider>
        );
    };

    WithDevice.getInitialProps = async (ctx: NextPageContext) => {
        const device: DeviceProps = {
            isMobile: false
        };

        const userAgent = ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent;

        device.isMobile = Boolean(
            userAgent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
        );

        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
            device
        };
    };

    WithDevice.displayName = `WithDevice(${getDisplayName(Page)})`;

    return WithDevice;
};
