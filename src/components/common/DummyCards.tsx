import React from "react";

export const DummyCards = (dummyCards: number, cardWidth: number): any =>
    Array(dummyCards)
        .fill(null)
        .map(() => (
            <div
                key={Math.random()}
                style={{ maxWidth: cardWidth + 10, width: "100%", height: "100%", margin: 5, flexGrow: 1 }}
            />
        ));
