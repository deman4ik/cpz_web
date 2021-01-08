import { createContext } from "react";

export type DeviceContextType = {
    isMobile: boolean;
};

const INITIAL_DEVICE_CONTEXT_VALUE = {
    isMobile: false
};

export const DeviceContext = createContext<DeviceContextType>(INITIAL_DEVICE_CONTEXT_VALUE);
