export type Robot = {
  id: string;
  name: string;
  timeframe: number;
  asset: string;
  isUserRobot: boolean;
  currency: 'USD' | 'RUB';
};

export enum SectionType {
  signals,
  openPositions,
  closedPositions
}

export type VisibleModal = {
  isVisible: boolean;
  type: string;
};
