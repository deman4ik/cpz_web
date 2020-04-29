interface Coord {
  x: number;
  y: number;
}

export interface SignalItem {
  cache: {
    id: string;
    tableName: string;
  };
  id: string;
  code: string;
  name: string;
  performance: Coord[];
  volume: number;
  exchange: string;
  asset: string;
  currency: string;
  profit: number;
  winRate: number;
  maxDrawdown: number;
  tradesCount: number;
  subscribed: number;
  active: number;
  isSubscribed: boolean;
  user_robots: {
    status: string;
    id: string;
  };
  started_at: number;
}
