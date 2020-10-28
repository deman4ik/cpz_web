export interface PropsOpenPositionsItem {
    item: {
        id: string;
        code: string;
        volume: number;
        asset: string;
        entry_price: string;
        entry_date: string;
        direction: string;
        profit: number;
        robot: {
            name: string;
            code: string;
            asset: string;
        };
    };
    onRedirectToDetailView: (code: string) => void;
}
