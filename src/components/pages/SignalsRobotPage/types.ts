export enum SectionType {
    signals,
    openPositions,
    closedPositions
}

export type VisibleModal = {
    isVisible: boolean;
    type: string;
};
