import { useCallback, useState } from "react";

export const useScrollPosition = () => {
    const [position, setPosition] = useState(window.pageYOffset);

    const preservePosition = () => setPosition(window.pageYOffset);
    const restorePosition = useCallback(() => window.scrollTo(0, position), [position]);

    return { preservePosition, restorePosition };
};
