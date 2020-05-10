import React from 'react';

import { DeviceContext } from '../deviceContext';
import { getDisplayName } from '../getDisplayName';
import { DeviceProps } from '../../config/types';

export const withDevice = (Page) => {
  const WithDevice = (props) => (
      <DeviceContext.Provider value={props.device}>
          <Page {...props} />
        </DeviceContext.Provider>
  );

  WithDevice.getInitialProps = async (ctx) => {
    const device: DeviceProps = {
      isMobile: false
    };

    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;

    device.isMobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
      device
    };
  };

  WithDevice.displayName = `WithDevice(${getDisplayName(Page)})`;

  return WithDevice;
};
