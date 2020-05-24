import { useState, useEffect, useContext } from "react";
import { DeviceContext } from "../libs/deviceContext";

export const useShowDimension = (width: number, dimension: number) => {
    const { isMobile } = useContext(DeviceContext);
    const [showDimension, setShowDimension] = useState(!isMobile);

    useEffect(() => {
        setShowDimension(width > dimension);
    }, [width, dimension]);

    return { showDimension };
};
