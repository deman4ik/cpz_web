import { useEffect, useState, useContext } from "react";
import { DeviceContext } from "../providers/deviceContext";

function getWindowDimensions(isMobile: boolean) {
    if (process.browser) {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return { width: !isMobile ? 1200 : 0, height: !isMobile ? 800 : 0 };
}

export default function useWindowDimensions(): any {
    const { isMobile } = useContext(DeviceContext);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(isMobile));

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions(isMobile));
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);

    return windowDimensions;
}
