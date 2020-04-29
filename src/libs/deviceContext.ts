import { createContext } from 'react';
import { DeviceProps } from '../config/types';

const device: DeviceProps = {
  isMobile: false
};

export const DeviceContext = createContext(device);
