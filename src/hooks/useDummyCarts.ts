import { useState, useEffect } from "react";

export const useDummyCarts = (width: number, cardWidth: number, dataLength: number) => {
    const [dummyCards, setDummyCards] = useState(0);

    useEffect(() => {
        if (width <= 1200) {
            const cardsInARow = width - 200 <= 0 ? 1 : Math.floor((width - 200) / cardWidth);
            const module = dataLength % cardsInARow;
            setDummyCards(module ? cardsInARow - module : 0);
        }
    }, [dataLength, cardWidth, width]);

    return { dummyCards };
};
