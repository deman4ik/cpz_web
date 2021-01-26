import { useState, useEffect, useContext } from "react";
import { DeviceContext } from "providers/deviceContext";

export const useShowDimension = (width: number, dimension: number): any => {
    const { isMobile } = useContext(DeviceContext);
    const [showDimension, setShowDimension] = useState(!isMobile);

    useEffect(() => {
        setShowDimension(width > dimension);
    }, [width, dimension]);

    return { showDimension };
};
